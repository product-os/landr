import { addParameters, configure } from '@storybook/react';
import { themes } from '@storybook/theming';

import 'circular-std'
import 'typeface-nunito'
import 'react-typist/dist/Typist.css'
import '../lib/components/global.css'

addParameters({
  options: {
    theme: themes.light,
    showPanel: false,
  },
});

const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
