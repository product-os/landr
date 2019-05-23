<h1 align="center">
    Landr
</h1>

## 🚀 Quick start

1. Navigate to the repository
2. run `GITHUB_TOKEN=[your token] npx landr`
3. Landr will push the changes to the `gh-pages` branch.

> We encourage using `npx` as opposed to installing landr globally. `npx` comes bundled with NPM version 5.2+. More info can be found [here](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).

## Using Landr as a dependency

1. Install landr

`npm install landr`

1. Add the a npm script entry in your `package.json` file

```json
  "scripts": {
    "landr": "landr"
  }
```

3. Run the CLI
`GITHUB_TOKEN=[your token] npm run landr`

1. Landr will push the changes to the `gh-pages` branch.

## Under the Hood

1.  Landr will scan the repo utilizing [Scrutinizer](https://github.com/balena-io-modules/scrutinizer).

2.  Then it will persist the data, and pass it over to [React Static](https://github.com/nozzle/react-static) which will produce a single page website. For styling, we\'ll use our very own [Rendition](https://github.com/balena-io-modules/rendition).
