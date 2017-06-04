const fs = require('fs');
const readmeParser = require('../');

fs.readFile('./samples/enzyme.md', 'utf8', (err, content) => {
  console.log(content);
  console.log(readmeParser(content));
})
