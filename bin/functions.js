import Crawler from './crawler';
import { backend, repoNamespace } from './auth';

const getRepoInformation = async () => {
  const crawler = new Crawler({ backend, repoNamespace });

  // TODO: Expose these functions and add/remove them as needed

  const metadata = await crawler.getRepoMetadata();
  const latestRelease = await crawler.getLatestRelease();
  const readme = await crawler.getReadme();
  const contributors = await crawler.getContributors();
  const frequency = await crawler.getCodeFrequencyStats();
  const commitActivity = await crawler.getCommitActivityStats();

  /*
    TODO: Make it configurable so that the paths can be changed
    and it's known what content should be fetched.
  */

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

export { getRepoInformation };
