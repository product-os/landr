/* eslint-disable no-unreachable */
/*
 * Copyright 2020 balena.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const path = require("path");
const _ = require("lodash");
const shell = require("shelljs");
const rimraf = require("rimraf");
const uuid = require("uuid");
const fs = require("fs");
const crypto = require("crypto");
const theme = require("./theme");
const netlify = require("./netlify");
const skel = require("./skel");
const json2toml = require("json2toml");
const { cloneDeep } = require("lodash");

const projectRoot = path.resolve(__dirname, "..");

exports.getNetlifySiteName = ({
  owner,
  branch,
  pullNumber,
  name,
  contract,
}) => {
  let siteName = `landr-${owner}-repo-${name}-preview-${pullNumber || branch}`;

  if (branch === "master") {
    siteName = `landr-${owner}-repo-${name}`;

    // Check if we are building site for a team member and if so,
    // check if the team member's site name matches the org's site name
    // and if so, use the org's site name
    if (contract.data.teamMembers && contract.data.links.homepage) {
      const currentMember = contract.data.teamMembers.find((member) => {
        return member.slug === name;
      });
      if (
        currentMember &&
        currentMember.data.links.homepage &&
        currentMember.data.links.homepage.startsWith(
          contract.data.links.homepage
        )
      ) {
        siteName = `landr-${owner}-repo-${owner}`;
      }
    }
  }

  return siteName;
};

const getCommandString = () => {
  const gatsbyBin = require.resolve("gatsby/cli.js");

  return `${gatsbyBin} build`;
};

const replaceBase64Images = async (contract, directory) => {
  for (const key in contract) {
    if (
      typeof contract[key] === "string" &&
      contract[key].startsWith("data:image/")
    ) {
      const match = contract[key].match(/data:image\/([a-zA-Z0-9+]+);base64/);

      if (match) {
        let fileType = match[1];
        if (fileType === "svg+xml") {
          fileType = "svg";
        }
        const fileContent = Buffer.from(
          contract[key].replace(/^data:image\/[a-zA-Z0-9+]+;base64,/, ""),
          "base64"
        );

        const hash = crypto
          .createHash("sha256")
          .update(fileContent)
          .digest("hex");
        const fileName = `${hash}-${key}.${fileType}`;
        const filePath = path.resolve(directory, fileName);

        await fs.promises.writeFile(filePath, fileContent, {
          encoding: "binary",
        });
        contract[key] = `/static/images/${fileName}`;
      }
    } else if (typeof contract[key] === "object") {
      await replaceBase64Images(contract[key], directory);
    }
  }
};

exports.run = async ({
  contractPath,
  outputDir,
  deploy,
  netlifyToken,
  branch,
  quiet,
  logger,
  pullNumber,
}) => {
  const log = logger;

  const contract = require(contractPath);

  const command = getCommandString();

  log(`Running from ${contractPath} into ${outputDir}`);

  // Wipe out output directory so that we start fresh everytime.
  rimraf.sync(outputDir);

  if (!contract.data.name) {
    throw new Error("The contract does not have a name");
  }

  // Deploy to a preview site if running on a branch
  // other than master.
  const name = contract.data.name;
  const owner = contract.data.github.owner.handle;

  // Prefer the pull number over the branch name if it is available to avoid hitting
  // Netlify's subdomain length limit
  const siteName = this.getNetlifySiteName({
    owner,
    branch,
    pullNumber,
    name,
    contract,
  });

  if (deploy) {
    log(`Preparing site ${siteName}`);
  }

  const siteOptions = deploy
    ? await netlify.setupSite(netlifyToken, siteName)
    : {};

  log("Parsing banner image");

  const bannerImage = _.get(contract, ["data", "images", "banner"], null);
  const orgFullLogo = _.get(contract, [
    "data",
    "github",
    "owner",
    "logo",
    "base64",
  ]);
  const orgLogoBrandmark = _.get(contract, [
    "data",
    "github",
    "owner",
    "logoBrandmark",
    "base64",
  ]);
  let themeImage = null;
  if (bannerImage) {
    themeImage = bannerImage;
  } else if (orgFullLogo) {
    themeImage = orgFullLogo;
  } else if (orgLogoBrandmark) {
    themeImage = orgLogoBrandmark;
  }
  const siteTheme = await theme(themeImage);

  const skeletonDirectory = path.join(projectRoot, "public");

  rimraf.sync(path.join(projectRoot, ".cache"));
  rimraf.sync(skeletonDirectory);
  await fs.promises.mkdir(skeletonDirectory, {
    recursive: true,
  });
  log(`Creating site skeleton at ${skeletonDirectory}`);
  await skel.create(
    contract,
    path.resolve(projectRoot, "skeleton"),
    skeletonDirectory
  );

  const imageDirectory = path.resolve(skeletonDirectory, "static/images");

  await fs.promises.mkdir(imageDirectory, {
    recursive: true,
  });

  log(`Replacing base64 images to paths in site skeleton at ${imageDirectory}`);
  const contractClone = cloneDeep(contract);
  await replaceBase64Images(contractClone, imageDirectory);

  // Replace base64 into image file into skeleton and update the contract
  const TMP_CONTRACT_FOLDER = path.resolve(projectRoot, ".tmp", uuid.v4());
  await fs.promises.mkdir(TMP_CONTRACT_FOLDER, {
    recursive: true,
  });
  log(`Creating temporary contract at ${TMP_CONTRACT_FOLDER}`);
  const tmpContractPath = path.resolve(TMP_CONTRACT_FOLDER, "contract.json");
  await fs.promises.writeFile(tmpContractPath, JSON.stringify(contractClone));

  log("Building site");

  // TODO: Don't output react-static log information,
  // as it has details that are non Landr related, such
  // as instructions to deploy to Netlify directly.
  const { code } = shell.exec(command, {
    silent: quiet,

    // The react-static project assumes in many places
    // that the root directory is the current working
    // directory, which may not be the case when Landr
    // is globally installed.
    // Fixing react-static doesn't seem easy, so this
    // is more of a workaround.
    cwd: projectRoot,

    // We need to merge `process.env` as otherwise we
    // completely override the environment, including
    // important variables like `PATH`.
    env: Object.assign({}, process.env, {
      // TODO: Pass the contract directly instead of passing the path to the
      // data
      LANDR_CONTRACT_PATH: tmpContractPath,
      LANDR_SKELETON_DIRECTORY: skeletonDirectory,

      LANDR_OUTPUT_DIRECTORY: outputDir,
      LANDR_DEPLOY_URL: siteOptions.url,
      LANDR_GOOGLE_MAPS_KEY: process.env.LANDR_GOOGLE_MAPS_KEY,
      LANDR_GOOGLE_GEOCODE_KEY: process.env.LANDR_GOOGLE_GEOCODE_KEY,
      LANDR_MIXPANEL_TOKEN: process.env.LANDR_MIXPANEL_TOKEN,
      LANDR_MIXPANEL_PROXY: process.env.LANDR_MIXPANEL_PROXY,
      LANDR_THEME: JSON.stringify(siteTheme),
      LANDR_IS_PREVIEW: branch !== "master",
    }),
    async: true,
  });

  rimraf.sync(TMP_CONTRACT_FOLDER);
  rimraf.sync(path.resolve(projectRoot, `templates`));
  if (code !== 0) {
    throw new Error(`Command failed with code ${code}: ${command}`);
  }

  await fs.promises.rename(path.resolve(__dirname, "..", "public"), outputDir);

  log("Site generated successfully", {});

  if (deploy) {
    log(`Deploying site to ${siteOptions.url}`);

    if (_.get(contract, ["netlifyConfig"])) {
      const netlifyToml = json2toml(_.get(contract, ["netlifyConfig"]));
      await fs.promises.writeFile(
        path.join(outputDir, "netlify.toml"),
        netlifyToml
      );
    }

    const result = await netlify.deploy(
      netlifyToken,
      siteOptions.id,
      outputDir
    );
    log(result.message);

    return {
      url: result.url,
      adminUrl: siteOptions.adminUrl,
    };
  }
};
