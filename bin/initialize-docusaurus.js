const shell = require('shelljs');

export const initialize = async () => {
  let useYarn = false;
  if (shell.which('yarn')) {
    useYarn = true;
  }

  await shell.rm('-rf', 'website');
  await shell.mkdir('website');
  await shell.cd('website');
  await shell.cp('-R', '../data/theme/.', '.');

  // Only for development -> should be a different script
  if (useYarn) {
    await shell.exec('yarn start');
  } else {
    await shell.exec('npm run start');
  }
};
