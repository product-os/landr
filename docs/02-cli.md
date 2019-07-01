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
[landr] Site generated successfully
```
