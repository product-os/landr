const scrutinizer = require('scrutinizer');
const path = require('path');
const branch = require('git-branch');

const gitDirectory = path.resolve('.git');
console.log(gitDirectory)

const fetch = async () => {

  const activeBranch = await branch(gitDirectory)

  return scrutinizer.local(gitDirectory, {
    reference: activeBranch,
    progress: (state) => {
      console.log(state.percentage)
    }
  }).then((results) => {
    console.log(results)
  })
}







module.exports = { fetch }
