const chalk = require('chalk')

exports.log = (message) => {
  console.log(chalk.blue('[landr]'), message)
}
