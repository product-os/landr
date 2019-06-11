#!/usr/bin/env node

const capitano = require('capitano');
const landr = require('./landr');

const showHelp = () => {
  console.error(`Usage: landr (preview)`);

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
  signature: 'deploy',
  description:
    'Build a website out of the Github metadata and publish it in Github Pages',
  action: ({ help }) => {
    if (help) {
      showHelp();
      process.exit(1);
    }

    landr();
  },
});

capitano.command({
  signature: 'preview',
  description: 'Spin off a preview of the generated landr website',
  action: ({ help }) => {
    if (help) {
      showHelp();
      process.exit(1);
    }

    landr({ isPreview: true });
  },
});

capitano.run(process.argv, err => {
  if (!err) return;

  showHelp();
  throw err;
});
