/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

const url = require("url");

const DATA = require(process.env.LANDR_CONTRACT_PATH);

const DEPLOY_URL =
  process.env.LANDR_IS_PREVIEW === "false"
    ? null
    : process.env.LANDR_DEPLOY_URL;

const siteUrl = DEPLOY_URL || DATA.data.links.homepage;

const pathPrefix = siteUrl ? new url.URL(siteUrl).pathname : null;

module.exports = {
  pathPrefix: pathPrefix || "",
  plugins: ["gatsby-plugin-styled-components"],
};
