Landr is made up of 3 core modules

- `landr` - cli which, parses config and calls submodules.
- `landr-interrogator` - Collects data on a `.git` repository. Pass it a directory and an array of plugins to gather data.
- `landr-static` - Builds a site from react components, it's a fork of [`react-static`](https://github.com/nozzle/react-static).

### `landr.conf.js`

A simple project will not need a config file, if you'd like to `landr.conf.js` file.

```javascript
{
  // A relative path to a theme that landr should use, or the name of built-in
  // landr theme. Defaults to `landr-theme-resin`
  theme: 'landr-theme-resin',
  settings: {
    // these are configuration settings unique to each theme
    // made available via `siteProps.settings`
  },
  plugins: [
    // array of functions that add data to siteProps
    ({ acc, dir }) => {
      acc.myData = 'foobar'
      return acc
    }
  ]
}
```
