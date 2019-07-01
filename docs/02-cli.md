Landr CLI
=========

The Landr CLI is able to generate websites and deploy them to Netlify and it
features the following small set of commands:

`landr build [meta.json]`
-------------------------

Build the site in the current working directory and store the generated files
in `dist`. Any existing `dist` directory will be removed.

| Arguments | Description | Optional? | Default |
|-----------|-------------|-----------|---------|
| `[meta.json]` | Path to `meta.json` | Y | `$PWD/meta.json` |

### Examples:

```sh
$ cd path/to/repo
$ landr build

  / /  __ _ _ __   __| |_ __
 / /  / _` | '_ \ / _` | '__|
/ /__| (_| | | | | (_| | |
\____/\__,_|_| |_|\__,_|_|

Generate great websites for your projects with zero configuration

[landr] Trying to load repository contract from /Users/jviotti/Projects/resin/landr/meta.json
[landr] Running from /Users/jviotti/Projects/resin/landr/meta.json into /Users/jviotti/Projects/resin/landr/dist
...
[landr] Site generated successfully
```

`landr test [meta.json]`
------------------------

Preview the site in the current working directory on port 3000. This is most
useful for Landr developers. A more realistic test for end users is to build
the site using `landr build` and serve `dist` with any static file server tool,
such as [`serve`](https://github.com/zeit/serve).

| Arguments | Description | Optional? | Default |
|-----------|-------------|-----------|---------|
| `[meta.json]` | Path to `meta.json` | Y | `$PWD/meta.json` |

### Examples:

```sh
$ cd path/to/repo
$ landr build

  / /  __ _ _ __   __| |_ __
 / /  / _` | '_ \ / _` | '__|
/ /__| (_| | | | | (_| | |
\____/\__,_|_| |_|\__,_|_|

Generate great websites for your projects with zero configuration

[landr] Trying to load repository contract from /Users/jviotti/Projects/resin/landr/meta.json
[landr] Running from /Users/jviotti/Projects/resin/landr/meta.json into /Users/jviotti/Projects/resin/landr/dist
Starting Development Server...
...
[✓] Application Bundled (8.3s)
[✓] App serving at localhost:3000
```
