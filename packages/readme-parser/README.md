### Install

```bash
npm i readme-parser
```

### Usage

```js
const fs = require('fs');
const readmeParser = require('readme-parser');

fs.readFile('./samples/enzyme.md', 'utf8', (err, content) => {
  console.log(readmeParser(content));
})
```

## Related

[readme-loader](https://github.com/craig-mulligan/readme-loader) - webpack loader using this module
