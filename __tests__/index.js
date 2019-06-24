const { generateConfiguration, buildStaticWebsite } = require('../bin/build');

describe('Build the website', () => {
  test(`Query the repository`, async () => {
    try {
      const data = await generateConfiguration();
      expect(data)
        .toHaveProperty('architecture')
        .toHaveProperty('contributing')
        .toHaveProperty('lastCommitDate')
        .toHaveProperty('latestRelease')
        .toHaveProperty('githubUrl')
        .toHaveProperty('public', expect.any(Boolean))
        .toHaveProperty('dependencies', expect.any(Array))
        .toHaveProperty('license', expect.any(String))
        .toHaveProperty('readme', expect.any(String))
        .toHaveProperty('description', expect.any(String));
    } catch (e) {
      if (!process.env.GITHUB_TOKEN) {
        expect(e).toEqual(new Error('Please provide a `GITHUB_TOKEN`'));
      }
    }
  }, 30000);
});
