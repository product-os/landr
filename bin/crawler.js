class Crawler {
  constructor({ backend, repoNamespace }) {
    this.backend = backend;
    this.repoNamespace = repoNamespace;
  }

  readFileContents({ content }) {
    return Buffer.from(content, 'base64').toString();
  }

  async getRepoMetadata() {
    const { data } = await this.backend.repos.get(this.repoNamespace);
    return data;
  }

  async getReadme() {
    const { data } = await this.backend.repos.getReadme(this.repoNamespace);
    const content = this.readFileContents(data);
    return content;
  }

  async getFile(path) {
    const { data } = await this.backend.repos.getContents({
      ...this.repoNamespace,
      path,
    });
    const content = this.readFileContents(data);
    return content;
  }

  async getContributors() {
    const { data } = await this.backend.repos.listContributors(
      this.repoNamespace,
    );
    return data;
  }

  async getLatestRelease() {
    const { data } = await this.backend.repos.getLatestRelease(
      this.repoNamespace,
    );
    return data;
  }

  async getCodeFrequencyStats() {
    const { data } = await this.backend.repos.getCodeFrequencyStats(
      this.repoNamespace,
    );
    return data;
  }

  async getCommitActivityStats() {
    const { data } = await this.backend.repos.getCommitActivityStats(
      this.repoNamespace,
    );
    return data;
  }
}

export default Crawler
