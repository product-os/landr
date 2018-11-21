<h1 align="center">
    Landr
</h1>

## 🚀 Quick start

1. Install landr

```bash
npm install landr
```

2. Add the a npm script entry in your `package.json` file

```json
"scripts": {
  "landr": "landr"
}
```

3. Run the CLI
```bash
GITHUB_TOKEN=[your token] npm run landr
```

4. Landr will push the changes to the `gh-pages` branch.

## Under the Hood

1.  Landr will scan the repo utilizing [Scrutinizer](https://github.com/balena-io-modules/scrutinizer).

2.  Then it will persist the data, and pass it over to [React Static](https://github.com/nozzle/react-static) which will produce a single page website. For styling we\'ll use our very own [Rendition](https://github.com/balena-io-modules/rendition).
