const path = require("path");
const generator = require("./lib/generator");
const fs = require("fs");
const handlebars = require("handlebars");

const DATA = require(process.env.LANDR_CONTRACT_PATH);

const DEPLOY_URL =
  process.env.LANDR_IS_PREVIEW === "false"
    ? null
    : process.env.LANDR_DEPLOY_URL;
const DIRECTORY = __dirname;

const siteUrl = DEPLOY_URL || DATA.data.links.homepage;


const site = generator(DATA, JSON.parse(process.env.LANDR_THEME), {
  siteUrl,
});

const analyticsOptions = process.env.LANDR_MIXPANEL_TOKEN
  ? {
      type: "mixpanel",
      proxy: process.env.LANDR_MIXPANEL_PROXY,
      token: process.env.LANDR_MIXPANEL_TOKEN,
    }
  : null;

exports.onCreateWebpackConfig = ({ stage, actions, loaders }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /xterm|xterm-addon-fit|mixpanel-browser/,
            use: loaders.null(),
          },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    node: {
      fs: "empty",
    },
    resolve: {
      fallback: {
        fs: false,
        path: require.resolve("path-browserify"),
      },
      alias: {
        "styled-components": path.resolve("node_modules", "styled-components"),
      },
    },
    module: {
      rules: [
        {
          test: /node_modules\/vfile\/core\.js/,
          use: [
            {
              loader: "imports-loader",
              options: {
                type: "commonjs",
                imports: ["single process/browser process"],
              },
            },
          ],
        },
      ],
    },
  });
};

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  const rendererBuffer = await new Promise((resolve, reject) => {
    fs.readFile(path.join(DIRECTORY, "lib/renderer.jsx.hbs"), (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

  await fs.promises.mkdir(path.resolve(DIRECTORY, "templates"), {
    recursive: true,
  });

  for (const [uri, combination] of Object.entries(site)) {
    const result = handlebars.compile(rendererBuffer.toString())({
      uri,
      combination,
    });

    const templateFilename = `${combination
      .map((definition) => {
        return definition.component;
      })
      .join("-")}.renderer.jsx`;

    const templatePath = path.resolve(DIRECTORY, "templates", templateFilename);

    try {
      await fs.promises.access(templatePath, fs.constants.F_OK);
    } catch (err) {
      // File doesn't exist, write it
      // eslint-disable-next-line no-loop-func
      await new Promise((resolve, reject) => {
        fs.writeFile(templatePath, result, (error) => {
          if (error) {
            return reject(error);
          }

          return resolve();
        });
      });
    }

    createPage({
      path: uri,
      component: templatePath,
      context: {
        analytics: analyticsOptions,
        landrConfig: {
          envVars: {
            googleMapsKey: process.env.LANDR_GOOGLE_MAPS_KEY,
          },
        },
        site: siteUrl,
        combination,
      },
    });
  }
};
