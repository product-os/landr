#!/usr/bin/env node

import { initialize } from './initialize-docusaurus';
import { generateConfiguration } from './functions';

const run = async () => {
  await generateConfiguration();
  await initialize();
};

run();
