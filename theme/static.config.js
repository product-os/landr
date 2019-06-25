import React, { Component } from 'react';
import { ServerStyleSheet } from 'styled-components';
import _ from 'lodash';

// scrutinizer JSON
import * as CONFIG from './config.js';

export default {
  basePath: CONFIG.name,
  getSiteData: () => {
    return CONFIG;
  },
  getRoutes: () => {
    return [
      {
        path: '/',
        component: 'src/containers/Home',
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ];
  },
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet();
    const html = render(sheet.collectStyles(<Comp />));
    meta.styleTags = sheet.getStyleElement();
    return html;
  },
  Document: class CustomHtml extends Component {
    render() {
      const { Html, Head, Body, children, renderMeta } = this.props;
      return (
        <Html>
          <Head>
            <title>{CONFIG.name}</title>
            <meta name="description" content={CONFIG.description} />
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Nunito&display=swap"
              rel="stylesheet"
            />
            <link
              rel="stylesheet"
              href="https://use.fontawesome.com/releases/v5.8.2/css/solid.css"
              integrity="sha384-ioUrHig76ITq4aEJ67dHzTvqjsAP/7IzgwE7lgJcg2r7BRNGYSK0LwSmROzYtgzs"
              crossOrigin="anonymous"
            />
            <link
              rel="stylesheet"
              href="https://use.fontawesome.com/releases/v5.8.2/css/brands.css"
              integrity="sha384-i2PyM6FMpVnxjRPi0KW/xIS7hkeSznkllv+Hx/MtYDaHA5VcF0yL3KVlvzp8bWjQ"
              crossOrigin="anonymous"
            />
            <link
              rel="stylesheet"
              href="https://use.fontawesome.com/releases/v5.8.2/css/fontawesome.css"
              integrity="sha384-sri+NftO+0hcisDKgr287Y/1LVnInHJ1l+XC7+FOabmTTIK0HnE2ID+xxvJ21c5J"
              crossOrigin="anonymous"
            />
            {renderMeta.styleTags}
          </Head>
          <Body>{children}</Body>
        </Html>
      );
    }
  },
};
