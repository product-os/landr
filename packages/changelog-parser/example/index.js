const fs = require('fs');
const changelogParser = require('../');

fs.readFile('./samples/enzyme.md', 'utf8', (err, content) => {
  console.log(changelogParser(content, 2));
})
