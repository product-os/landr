#!/usr/bin/env node

const capitano = require('capitano');

const deploy = require('./deploy');
const {generateConfiguration, buildStaticWebsite} = require('./build');
const preview = require('./preview');
const { print } = require ('./utils')

const showHelp = () => {
  console.log(`Usage: landr (preview)`);

  console.log('Commands:\n');
  for (const command of capitano.state.commands) {
    if (command.isWildcard()) continue;

    console.log(`\t${command.signature}\t\t${command.description}`);
    for (const option of command.options) {
      console.log(
        `\t  ${option.alias ? '-' + option.alias + ', ' : ''}--${
          option.signature
        }`
      );
      if (option.description) console.log(`\t\t${option.description}`);
    }
  }
};

capitano.command({
  signature: '*',
  action: () => {
    showHelp();
    process.exit(1);
  },
});

capitano.command({
  signature: 'build',
  description: 'Build a website out of the Github metadata',
  action: async ({ help }) => {
    if (help) {
      showHelp();
      process.exit(1);
    }

    await generateConfiguration();
  },
});

capitano.command({
  signature: 'deploy',
  description: 'Build & publish the website in Github Pages',
  action: async ({ help }) => {
    if (help) {
      showHelp();
      process.exit(1);
    }

    await generateConfiguration();
    await buildStaticWebsite();
    await deploy();
  },
});

capitano.command({
  signature: 'preview',
  description: 'Build & spin off a preview of the generated landr website',
  action: async ({ help }) => {
    if (help) {
      showHelp();
      process.exit(1);
    }

    await generateConfiguration();
    await buildStaticWebsite();
    preview();
  },
});

capitano.run(process.argv, err => {
  if (!err) return;

  print.danger('\nAn error occurred:')
  throw err;
});
