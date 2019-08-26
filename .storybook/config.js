import { addParameters, configure } from '@storybook/react';
import { create, themes } from '@storybook/theming';

import 'circular-std'
import 'typeface-nunito'
import 'react-typist/dist/Typist.css'
import '../lib/components/global.css'
import logo from './logo.png'

const theme = create({
  brandTitle: 'Landr',
  brandUrl: 'https://github.com/balena-io/landr',
  brandImage: logo,
})

addParameters({
  options: {
    theme,
    showPanel: false,
  },
});

const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
