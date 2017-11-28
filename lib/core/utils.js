import path from 'path'
const LANDR_ROOT = path.resolve(`${__dirname}/../../`)

export const getPaths = (cwd, themeRoot) => ({
  src: `${themeRoot}`,
  dist: `${cwd}/www/dist`,
  public: `${cwd}/www/public`,
  local_node_modules: `${LANDR_ROOT}/node_modules`
})

export const preferDefault = p => require(p).default || require(p)
