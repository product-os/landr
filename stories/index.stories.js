import React from 'react';
import { Provider } from 'rendition';

import { storiesOf } from '@storybook/react';

import { render as Navigation } from '../lib/components/navigation';
import { render as Jumbotron } from '../lib/components/jumbotron';
import { render as Highlights } from '../lib/components/highlights';
import { render as Users } from '../lib/components/users';
import { render as Motivation } from '../lib/components/motivation';
import { render as Contributors } from '../lib/components/contributors';
import { render as Faq } from '../lib/components/faq';
import { render as Footer } from '../lib/components/footer';

import { theme, props } from './config';

storiesOf('/Pages/Homepage', module).add('Variant 1', () => (
  <Provider theme={theme}>
    <Navigation {...props.Navigation} />
    <Jumbotron {...props.Jumbotron} />
    <Highlights {...props.Highlights} />
    <Users {...props.Users} />
    <Motivation {...props.Motivation} />
    <Contributors {...props.Contributing} />
    <Faq {...props.Faq} />
    <Footer {...props.Footer} />
  </Provider>
));

storiesOf('/Sections/Navigation', module).add('Variant 1', () => (
  <Provider theme={theme}>
    <Navigation {...props.Navigation} />
  </Provider>
));

storiesOf('/Sections/Jumbotron', module).add('Variant 1', () => (
  <Provider theme={theme}>
    <Jumbotron {...props.Jumbotron} />
  </Provider>
));

storiesOf('/Sections/Highlights', module).add('Variant 1', () => (
  <Provider theme={theme}>
    <Highlights {...props.Highlights} />
  </Provider>
));

storiesOf('/Sections/Users', module).add('Variant 1', () => (
  <Provider theme={theme}>
    <Users {...props.Users} />
  </Provider>
));

storiesOf('/Sections/Motivation', module).add('Variant 1', () => (
  <Provider theme={theme}>
    <Motivation {...props.Motivation} />
  </Provider>
));

storiesOf('/Sections/Contributors', module).add('Variant 1', () => (
  <Provider theme={theme}>
    <Contributors {...props.Contributing} />
  </Provider>
));

storiesOf('/Sections/FAQ', module).add('Variant 1', () => (
  <Provider theme={theme}>
    <Faq {...props.Faq} />
  </Provider>
));

storiesOf('/Sections/Footer', module).add('Variant 1', () => (
  <Provider theme={theme}>
    <Footer {...props.Footer} />
  </Provider>
));
