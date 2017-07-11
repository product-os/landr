const path = require('path');

const modifyWebpackConfig = (gatsby, pluginOpts) => {
  let webpackConfig = gatsby.config;
  const stage = gatsby.stage;

  webpackConfig.merge({
    module: {
      noParse: [
        /node_modules\/reactstrap-tether\/dist\/js\/tether.js/
      ]
    },
    resolve: {
      modulesDirectories: [
        path.resolve(`${pluginOpts.userDir}`),
        path.resolve(`${__dirname}/../`),
        path.resolve(`${pluginOpts.userDir}/node_modules`),
        path.resolve(`${__dirname}/../node_modules`)
      ]
    }
  });

  return webpackConfig;
};

module.exports = modifyWebpackConfig;
