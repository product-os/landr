import pathParse from 'path-parse'
const cache = {}
function importAll(r) {
  r.keys().forEach(key => (cache[pathParse(key).name] = r(key)))
}

// object is created in /core/assets
// this creates an object with all items from /assets (including subfolder)
importAll(
  require.context('landr-assets/', true, /\.(png|svg|jpg|gif|ico|pdf)$/)
)

export default cache
