## ideas

`lander` - builds `lander.config.js`? and runs the build
`lander -s` - runs the build + the server

```
.lander
  - index.html
  - /js (users custom js)
  - /scss (users custom scss)
  - bundle.js (bundled + minified js)
  - bundle.css (bundled css)
```

## issues

- Webpack's regexs' currently wont work with windows
- Need good way to document hbs templates
- How to handle async actions in lander.conf.js?
