module.exports = ({
  config,
  pages,
  locals
}) => hook => {
  if (typeof config.hooks[hook] === 'function') {
    return Promise.resolve(config.hooks[hook]())
  }
}
