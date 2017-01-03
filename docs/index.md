## Overview

Landr assumes your repository follows some standard conventions. It uses these conventions to extract useful data it'll need to build a landing page. It also provides flexibility in how your page is composed by making templates modular and easily customizable. This allows you to build websites without maintaining + committing loads of source like templates & scss & js.

## How it Works

It's a simple CLI that leverages [webpack](https://webpack.github.io) in several ways.

1. We use webpack loaders to parse specific files. For example, we have a `readme-loader` that takes a `README.md` and (with the assumption your readme is fairly conventional) will return and object like this.

```
{ title: 'landr',
  lead: 'source code = website.',
  description: 'Build static websites for software projects with zero (currently a fair amount of) configuration.',
  logo: 'https://d30y9cdsu7xlg0.cloudfront.net/png/43478-200.png',
  sections:[
  { title: 'Installation',
   content: '<pre><code>npm install landr -g\n</code></pre>\n<pre><code>landr dev -p 3000\n</code></pre>\n<p>Visit <code>localhost:3000</code>.</p>\n<pre><code>landr deploy\n</code></pre>\n' },
  { title: 'Features',
   content: '<ul>\n<li>Simple to use - install and deploy!</li>\n<li>Control - extendable</li>\n<li>blah blah</li>\n</ul>\n' },
  { title: 'How it Works',
   content: '<p>Landr leverages webpack, we have custom loaders that load conventional source files like a <code>README</code> consumable data. We can load it into templates and build your site, therefore updating as your repository updates.</p>\n' },
  { title: 'Why landr',
   content: '<p>You have to maintain your source code why maintain a website too?</p>\n<p>As a software company we have a growing number of websites to build and maintain. We built landr so we could focus on our projects and not their websites.</p>\n' },
  { title: 'Meta',
   content: '<p>Distributed under the XYZ license. See <code>LICENSE</code> for more information.</p>\n' } ] }
```

2. Landr uses webpack to bundle `css`.
  - Landr ships with some default styles see: `/lib/static/scss`.
  - Landr ships with [bourbons](http://bourbon.io/docs/) styles.
  - You can add your own styles by adding them to `$CWD/www/scss/index.scss`.
  - You customise all bootstrap variables adding a file `$CWD/www/scss/_variables.scss`. See all available vars: [here](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss).

3. Landr uses webpack to bundle `js`.
  - Landr ships with jquery/bootstrap/tether for basic dom manipulation.
  - It allows you to add your own by adding any js file to `$CWD/www/js`.

4. Landr uses webpack for smart resolving templates.
  - For example if you load the nav template
  ```
  require('nav')
  ```
  - It'll first check if you have a template in `$CWD/www/templates` and then check landr's built in templates.

5. Landr uses webpack for serving.
  - This allows us to recompile + reload the page (currently no hmr) every time
  a source file is touched.

6. landr uses webpack plugins to output html.
 - We use `HtmlWebpackPlugin` to output the html to `buildDir` and `HtmlWebpackPrefixPlugin` to prefix any links if the `--prefix` flag is passed in the cli. This is handy when deploying to gh-pages where all internal links need to be prefixed with `/<gh-repo-name>/`.

## How to use it

The entry point for webpack is `$CWD/landr.conf.js`. It's responsibility is to load data with loaders (eg. `readme-loader`) and load templates.

We currently use handlebars for templating, each template is loaded as a function that takes a object with various attributes. The function returns a string of html.

You can then build a landing page by passing data to templates and chaining them together in whatever order you like.

Here is what a simple `landr.conf.js` would look like this.

``` javascript
const README = require('readme!./README.md');

const blocks = [
  head({
    title: README.title,
    url: 'http://landr.io',
    lead: README.lead,
    image: README.screenshot,
    favicon: require('www/images/favicon.ico')
  }),
  navbar({
    title: README.title,
    items: navLinks,
    class: 'py-1 bg-faded navbar-light'
  }),
  jumbotron({
    title: README.lead,
    lead: README.description,
    image: README.logo,
    meta: `I'm small insignificant text`,
    description: btn({
      title: `Try ${README.title}`,
      href: `#${README.sections[0].title}`,
      class: 'btn-primary btn-lg'
    }),
    class: 'py-3 m-0 bg-faded text-xs-center'
  }),
  footer({
    meta: `${README.title} is an open source project by ${link({
      text: 'resin.io',
      href: 'https://resin.io',
      class: 'text-white',
      target: '_blank'
    })} - Modern DevOps for the Industrial Internet of Things`,
    items: navLinks,
    class: 'py-3 bg-inverse text-white'
  })
]

module.exports = blocks.join('');
```

Now that our `landr.conf.js` is ready we run:

```
landr dev
```

It'll compile and serve on port `3000`.

Options for `landr dev`:

```
➜  landr git:(master) ✗ landr dev --help
landr dev

Options:
  --help, -h     show help                                             [boolean]
  --version, -v  show version number                                   [boolean]
  --prod         Flag for production compile          [boolean] [default: false]
  --quiet, -q    Flag for displaying compile logs      [boolean] [default: true]
  --buildDir     Prefixes all links with supplied string
                                          [string] [default: "/tmp/landr/build"]
  --port, -p     Set webpack server port                         [default: 3000]
```

### If everything looks pretty, run:

```
landr deploy
```

This uses [`gh-pages`](https://www.npmjs.com/package/gh-pages) which commits the built assets from the `buildDir` to `gh-pages` branch and pushes em up to your remote.

Options for `landr deploy`:

```
landr deploy

Options:
  --help, -h     show help                                             [boolean]
  --version, -v  show version number                                   [boolean]
  --prod         Flag for production compile          [boolean] [default: false]
  --quiet, -q    Flag for displaying compile logs      [boolean] [default: true]
  --buildDir     Prefixes all links with supplied string
                                          [string] [default: "/tmp/landr/build"]
  --prefix       Prefixes all links with supplied string                [string]
```

See [`./THOUGHTS.md`](https://github.com/resin-io-playground/lander/blob/master/docs/THOUGHTS.md) mid-development ideas/doubts/concerns.
