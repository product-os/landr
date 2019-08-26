import { addParameters, configure } from '@storybook/react';
import { themes } from '@storybook/theming';

import 'circular-std'
import 'typeface-nunito'

addParameters({
  options: {
    theme: themes.light,
  },
});

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
