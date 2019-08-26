import React from 'react';
import { Provider } from 'rendition';

import { storiesOf } from '@storybook/react';

import { render as Navigation } from '../lib/components/navigation';
import { render as Jumbotron } from '../lib/components/jumbotron';
import { render as Users } from '../lib/components/users';
import { render as Contributors } from '../lib/components/contributors';
import { render as Faq } from '../lib/components/faq';
import { render as Footer } from '../lib/components/footer';
// import { render as BlogList } from '../lib/components/blog-list'
// import { render as DocViewer } from '../lib/components/doc-viewer'

import {theme, props } from './config';

storiesOf('Navigation', module).add('Variant 1', () => (
  <Provider theme={theme}>
    <Navigation {...props.Navigation} />
  </Provider>
));

storiesOf('Jumbotron', module).add('Variant 1', () => (
  <Provider theme={theme}>
    <Jumbotron {...props.Jumbotron} />
  </Provider>
));

storiesOf('Users', module).add('Variant 1', () => (
  <Provider theme={theme}>
    <Users {...props.Users} />
  </Provider>
));

storiesOf('Contributors', module).add('Variant 1', () => (
  <Provider theme={theme}>
    <Contributors {...props.Contributing} />
  </Provider>
));

storiesOf('FAQ', module).add('Variant 1', () => (
  <Provider theme={theme}>
    <Faq {...props.Faq} />
  </Provider>
));

storiesOf('Footer', module).add('Variant 1', () => (
  <Provider theme={theme}>
    <Footer {...props.Footer} />
  </Provider>
));
