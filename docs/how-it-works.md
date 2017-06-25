## Under the hood

The idea of landr is pretty simple it take's a git repo, assumes some conventions and from those conventions, it churns out a static website. We didn't want to build another static site generator so we use [gatsby](https://www.gatsbyjs.org/docs/) to do the heavy lifting, gatsby is only responsible for gathering data and abstracting alot of the standard setup required for a gatsby project.

## Packages

Landr is built in a module style, as many of the packages may be useful in other contexts.

- changelog-parser
  - Parses a changelog into
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
- readme-parser
  - Parses a readme.md into
  ```
  {
    title,
    lead,
    features {
      title,
      content
    }
    install {
      title,
      content
    },
    contribute {
      title,
      content
    },
    license {
     title
     content
    }
  }
  ```
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
