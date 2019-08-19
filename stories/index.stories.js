import React from 'react';

import { storiesOf } from '@storybook/react';

import { render as Navigation } from '../lib/components/navigation'
import { render as Jumbotron } from '../lib/components/jumbotron'
import { render as Users } from '../lib/components/users'
import { render as Contributors } from '../lib/components/contributors'
import { render as Faq } from '../lib/components/faq'
import { render as Footer } from '../lib/components/footer'
// import { render as BlogList } from '../lib/components/blog-list'
// import { render as DocViewer } from '../lib/components/doc-viewer'

storiesOf('Navigation', module)
  .add('Variant 1', () => <div>Lorem </div>)
  .add('Variant 2', () => <div>Lorem </div>)
  .add('Variant 3', () => <div>Lorem </div>)

storiesOf('Jumbotron', module)
  .add('Variant 1', () => <div>Lorem </div>)
  .add('Variant 2', () => <div>Lorem </div>)
  .add('Variant 3', () => <div>Lorem </div>)

storiesOf('Users', module)
  .add('Variant 1', () => <div>Lorem </div>)
  .add('Variant 2', () => <div>Lorem </div>)
  .add('Variant 3', () => <div>Lorem </div>)

storiesOf('Contributors', module)
  .add('Variant 1', () => <div>Lorem </div>)
  .add('Variant 2', () => <div>Lorem </div>)
  .add('Variant 3', () => <div>Lorem </div>)

storiesOf('FAQ', module)
  .add('Variant 1', () => <div>Lorem </div>)
  .add('Variant 2', () => <div>Lorem </div>)
  .add('Variant 3', () => <div>Lorem </div>)

  storiesOf('Footer', module)
  .add('Variant 1', () => <div>Lorem </div>)
  .add('Variant 2', () => <div>Lorem </div>)
  .add('Variant 3', () => <div>Lorem </div>)

