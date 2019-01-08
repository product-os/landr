import Crawler from './crawler';
import { backend, repoNamespace } from './auth';
import fs from 'fs';

const CWD = process.cwd();

// TODO: Clean up. Will dump everything here for now
export const generateConfiguration = async () => {
  const crawler = new Crawler({ backend, repoNamespace });

  const metadata = await crawler.getRepoMetadata();
  const latestRelease = await crawler.getLatestRelease();
  const readme = await crawler.getReadme();
  const contributors = await crawler.getContributors();
  const frequency = await crawler.getCodeFrequencyStats();
  const commitActivity = await crawler.getCommitActivityStats();
  const changelog = await crawler.getFile('CHANGELOG.md');

  const siteConfig = {};

  // Basic
  siteConfig.title = metadata.name;
  siteConfig.tagline = metadata.description;
  siteConfig.url = metadata.html_url;
  siteConfig.baseUrl = '/';
  siteConfig.projectName = metadata.name;
  siteConfig.organizationName = metadata.owner.login;
  siteConfig.headerLinks = [
    { page: 'changelog', label: 'Changelog' },
    { href: metadata.html_url, label: 'Github' },
  ];
  siteConfig.favicon = 'img/favicon.png';
  siteConfig.colors = {
    primaryColor: '#000000',
    secondaryColor: '#1CBB33',
  };
  siteConfig.copyright = `Copyright © ${new Date().getFullYear()} ${metadata
    .owner.login}`;
  siteConfig.highlight = {
    theme: 'default',
  };
  siteConfig.scripts = ['https://buttons.github.io/buttons.js'];
  siteConfig.onPageNav = 'separate';
  siteConfig.cleanUrl = true;
  siteConfig.ogImage = 'img/docusaurus.png';
  siteConfig.twitterImage = 'img/docusaurus.png';

  // Releases
  siteConfig.releases = latestRelease;
  siteConfig.changelog = changelog;

  const body = `module.exports=${JSON.stringify(siteConfig)}`;

  fs.writeFileSync(CWD + '/data/theme/siteConfig.js', body);

  return;
};
