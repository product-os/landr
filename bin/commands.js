#!/usr/bin/env node
import capitano from 'capitano';
// import doxx from 'doxx'
import _ from 'lodash';
import { getRepoInformation } from './functions';

const errorHandler = error => {
  console.error(error);
  process.exit(1);
};

capitano.command({
  signature: '*',
  description: 'Get repo metadata',
  action: async () => {
    try {
      getRepoInformation();
    } catch (error) {
      errorHandler(error);
    }
  },
});

capitano.command({
  signature: 'doxx',
  description: 'Prepare docs',
  action: async () => {
    try {
      console.log('test');
      // doxx()
    } catch (error) {
      errorHandler(error);
    }
  },
});

capitano.command({
  signature: 'build',
  description: 'Prepare the build bundle',
  action: async () => {
    try {
      console.log('this is a placeholder function');
    } catch (error) {
      errorHandler(error);
    }
  },
});

capitano.run(process.argv, error => {
  if (error != null) {
    throw error;
  }
});
