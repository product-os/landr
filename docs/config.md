Landr is made up of 3 core modules

- `landr` - cli which, parses config and calls submodules.
- `landr-interrogator` - Collects data on a `.git` repository. Pass it a directory and an array of plugins to gather data.
- `landr-static` - Builds a site from react components, it's a fork of [`react-static`](https://github.com/nozzle/react-static).

### `landr.conf.js`

A simple project will not need a config file, if you'd like to `landr.conf.js` file.

```javascript
{
  // A theme to inherit from, this means that the remainder of the config will
  // be inherited from this theme as well as source files.
  // For example, the config.getRoutes() function will automatically be
  // inherited from 'landr-theme-resin' if not set.
  // Any components required with `@landr/<component>` will be resolved
  // via your `.landr/components` folder and then fallback to `theme-folder/components`
  // interrogator collects data from your repository and hands it back to landr
  // config for static site theme
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
