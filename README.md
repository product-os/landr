<h1 align="center">
    Landr
</h1>

> Build a website for your software projects with one command.


## 🚀 Quick start

1. Navigate to the repository
2. run `GITHUB_TOKEN=[your token] npx landr deploy`
3. Landr will push the changes to the `gh-pages` branch.

> We encourage using `npx` as opposed to installing landr globally. `npx` comes bundled with NPM version 5.2+. More info can be found [here](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).

## Alternatively using Landr as a dependency

1. Install landr

`npm install landr`

2. Add the following to the script entry in the project's `package.json` file

```json
  "scripts": {
    "landr": "landr deploy",
    "landr-preview": "landr preview"
  }
```

3. Run the CLI
`GITHUB_TOKEN=[your token] npm run landr`

4. Landr will push the generated files to the `gh-pages` branch.

## Commands

Landr exposes two commands

1. `deploy` - Generates the artifacts and pushes to Github pages
2. `preview` - Generates the artifacts and starts a local server

## Under the Hood

1.  Landr will scan the repo utilizing [Scrutinizer](https://github.com/balena-io-modules/scrutinizer).

2.  Then it will persist the data, and pass it over to [React Static](https://github.com/nozzle/react-static) which will produce a single page website. For styling, we\'ll use our very own [Rendition](https://github.com/balena-io-modules/rendition).
