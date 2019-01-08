const shell = require('shelljs');
const CWD = process.cwd();

export const initialize = async ({ websiteConfig }) => {
  let useYarn = false;
  if (shell.which('yarn')) {
    useYarn = true;
  }

  await shell.rm('-rf', 'website');
  await shell.cd(CWD);
  await shell.mkdir('website');
  await shell.cd('website');

  await shell.cp('-R', '../data/theme/.', '.');

  if (useYarn) {
    await shell.exec('yarn start');
  } else {
    await shell.exec('npm run start');
  }
};
