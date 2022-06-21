const resolve = require.resolve

module.exports = (api, {
  external, hot, node, modules
} = {}) => {
  // Const { NODE_ENV } = process.env
  // const PRODUCTION = NODE_ENV === 'production'

  // Turn on the cache
  api.cache(true)

  // This preset is for external node_modules only.
  if (external) {
    return {
      sourceType: 'unambiguous',
      presets: [ resolve('@babel/preset-env') ],
      plugins: [
        [
          resolve('@babel/plugin-transform-runtime'),
          {
            corejs: false,
            useESModules: true
          }
        ],
        resolve('@babel/plugin-syntax-dynamic-import')
      ]
    }
  }

  if (node) {
    return {
      presets: [
        resolve('@babel/preset-env'),
        [
          resolve('@babel/preset-react'),
          {
            development: false
          }
        ]
      ],
      plugins: [
        resolve('babel-plugin-macros'),
        resolve('@babel/plugin-syntax-dynamic-import'),
        resolve('@babel/plugin-transform-destructuring'),
        resolve('@babel/plugin-transform-runtime'),
        resolve('@babel/plugin-proposal-class-properties'),
        resolve('@babel/plugin-proposal-optional-chaining'),
        resolve('@babel/plugin-proposal-export-default-from')
      ]
    }
  }
}
