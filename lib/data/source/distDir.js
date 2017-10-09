module.exports = ({ store, actions }) => {
  const state = store.getState()
  const distDir = `${process.env.HOME}/landr/${state.locals.git.owner}/${state
    .locals.git.name}`
  actions.addConfig({ distDir })
}
