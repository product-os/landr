import Crawler from './crawler';
import { backend, repoNamespace } from './auth';
import fs from 'fs';

const CWD = process.cwd();

export const getRepoInformation = async () => {
  const crawler = new Crawler({ backend, repoNamespace });

  const metadata = await crawler.getRepoMetadata();
  const latestRelease = await crawler.getLatestRelease();
  const readme = await crawler.getReadme();
  const contributors = await crawler.getContributors();
  const frequency = await crawler.getCodeFrequencyStats();
  const commitActivity = await crawler.getCommitActivityStats();

  // const faq = await crawler.getMarkdownFile('');
  const changelog = await crawler.getFile('CHANGELOG.md');

  return {
    metadata,
    latestRelease,
    readme,
    contributors,
    frequency,
    commitActivity,
    changelog,
  };
};

export const generateConfiguration = async ({
  metadata,
  latestRelease,
  readme,
  contributors,
  frequency,
  commitActivity,
}) => {
  const siteConfig = {};

  siteConfig.title = metadata.name;
  siteConfig.tagline = metadata.description;
  siteConfig.url = metadata.html_url;
  siteConfig.baseUrl = '/';
  siteConfig.projectName = metadata.name;
  siteConfig.organizationName = metadata.owner.login;
  siteConfig.headerLinks = [{ page: 'changelog', label: 'Changelog' }];
  siteConfig.headerIcon = 'img/docusaurus.svg';
  siteConfig.footerIcon = 'img/docusaurus.svg';
  siteConfig.favicon = 'img/favicon.png';
  siteConfig.colors = {
    primaryColor: '#202020',
    secondaryColor: '#efefef',
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

  const body = `module.exports=${JSON.stringify(siteConfig)}`;

  fs.writeFileSync(CWD + '/data/theme/siteConfig.js', body);

  return;
};
