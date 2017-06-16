#!/usr/bin/env node
const program = require('commander');
const packageJson = require('../package.json');
const path = require('path');
const _ = require('lodash');
const config = require('../dist/config');
const eject = require('../dist/eject');
const fs = require('fs-extra');
console.log('bin/cli: time since started:', process.uptime());

process.on('unhandledRejection', error => {
  console.error('UNHANDLED REJECTION', error.stack);
});

const defaultHost = 'localhost';

const directory = path.resolve(`${__dirname}/..`);
const userDirectory = process.cwd();

const writeConfigFiles = Object.keys(config).map(file => {
  fs.outputFile(`${__dirname}/../${file}`, config[file](userDirectory));
});

program.version(packageJson.version).usage('[command] [options]');

console.time('time to load develop');
program
  .command('develop')
  .description(
    'Start development server. Watches files and rebuilds and hot reloads ' +
      'if something changes'
  ) // eslint-disable-line max-len
  .option(
    '-H, --host <url>',
    `Set host. Defaults to ${defaultHost}`,
    defaultHost
  )
  .option('-p, --port <port>', 'Set port. Defaults to 8000', '8000')
  .option('-o, --open', 'Open the site in your browser for you.')
  .action(command => {
    const develop = require('gatsby/dist/utils/develop');
    Promise.all(writeConfigFiles).then(() => {
      const p = Object.assign(command, { directory });
      develop(p);
    });
  });

program
  .command('build')
  .description('Build a Gatsby project.')
  .option(
    '--prefix-paths',
    'Build site with link paths prefixed (set prefix in your config).'
  )
  .action(command => {
    // Set NODE_ENV to 'production'
    process.env.NODE_ENV = 'production';

    const build = require('gatsby/dist/utils/build');
    Promise.all(writeConfigFiles)
      .then(data => {
        const p = Object.assign(command, { directory });
        return build(p);
      })
      .then(() => {
        console.log(`Done building in`, process.uptime(), `seconds`);
        process.exit();
      });
  });

program
  .command('serve')
  .description('Serve built site.')
  .option(
    '-H, --host <url>',
    `Set host. Defaults to ${defaultHost}`,
    defaultHost
  )
  .option('-p, --port <port>', 'Set port. Defaults to 9000', '9000')
  .option('-o, --open', 'Open the site in your browser for you.')
  .action(command => {
    const serve = require('gatsby/dist/utils/serve');
    const p = Object.assign(command, { directory });
    serve(p);
  });

program
  .command('eject')
  .description('Eject a page, component or global styles')
  .option(
    '-c, --component <name>',
    'Eject a single component. Will write to <rootDir>/www/component/<name>.js'
  )
  .option(
    '-s, --style',
    'Eject a global styles. Will write to <rootDir>/www/styles/index.scss'
    // eject.style(userDirectory)
  )
  .option(
    '-p, --page <name>',
    'Eject a page. Will write to <rootDir>/www/pages/<name>.js'
  )
  .action(function(command) {
    // TODO this is messy probably should refactor to sub commands.
    let type;
    let name;
    if (command.page) {
      type = 'page';
      name = command.page;
    }

    if (command.style) {
      (type = 'style'), (name = 'index');
    }

    if (command.component) {
      type = 'component';
      name = command.component;
    }

    console.log(name);
    eject[type](userDirectory, name).then(() => {
      console.log('Done!');
    });
  });

program.on('--help', () => {
  console.log(
    `To show subcommand help:

    landr [command] -h
    `
  );
});

// If the user types an unknown sub-command, just display the help.
const subCmd = process.argv.slice(2, 3)[0];
let cmds = _.map(program.commands, '_name');
cmds = cmds.concat([`--version`, `-V`]);

if (!_.includes(cmds, subCmd)) {
  program.help();
} else {
  program.parse(process.argv);
}
