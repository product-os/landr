## Under the hood

The idea of landr is pretty simple it take's a git repo, assumes some conventions and from those conventions, it churns out a static website. We didn't want to build another static site generator so we use [gatsby](https://www.gatsbyjs.org/docs/) to do the heavy lifting, gatsby is only responsible for gathering data and abstracting a lot of the standard setup required for a gatsby project.

## Packages

Landr is built in a module style, as many of the packages may be useful in other contexts.

- changelog-parser
  - Parses a changelog into
- readme-parser
  - Parses a readme.md into object
- gatby-plugin-readme
  - Adds readme object `readme-parser` to graphql server so that it can be queried from templates
- gatby-plugin-changelog
  - Adds changelog object `readme-changelog` to graphql server so that it can be queried from templates
- md-parser-utils
  - Utilities to help markdown parsers.
- landr
  - core set of modules for parsing configuration and providing api for landr-cli.
  - currently the root directory of where the site is built from (this may change)
- landr-components
  - holds `layouts`, `pages`, and `components`. All of which are react components.
- gatsby-source-github
  - pulls repo data from the github api.

### Getting data

### Github API
TODO

#### Readme

We parse you README.md into a query-able object.   

```
{
  title, // First heading in file
  lead, // First <p> in file
  features { // First heading that matches 'features'
    title,
    content // all content from the heading to the next heading of the same level
  }
  install { // First heading that matches one of [ 'install', 'getting started', 'quick start guide' ]
    title,
    content // all content from the heading to the next heading of the same level
  },
  contribute {  // First heading that matches one of [ 'contrib', 'get involved']
    title,
    content // all content from the heading to the next heading of the same level
  },
  license { // First heading that matches one of [ 'license' ]
   title
   content // all content from the heading to the next heading of the same level
  }
}
```

### Changelog

We parse you CHANGELOG.md into a query-able object. It'll pull every h2 and it's child content into a any entry.

```
{
  entries [
    {
      title,
      content
    }
    ...
  ]
}
```
