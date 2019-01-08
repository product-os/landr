#!/usr/bin/env node

import { initialize } from './initialize-docusaurus';
import { getRepoInformation, generateConfiguration } from './functions';

const run = async () => {
  const repoMetadata = await getRepoInformation();
  const websiteConfig = await generateConfiguration(repoMetadata);
  await initialize({
    websiteConfig
  });
};

run();
