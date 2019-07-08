CLI
===

The Landr CLI is able to generate websites and deploy them to Netlify and it
features the following small set of commands:

`landr [meta.json]`
-------------------

This is an alias for `landr deploy [meta.json]`. Please refer to that command's
help section.

`landr build [meta.json]`
-------------------------

Build the site in the current working directory and store the generated files
in `dist`. Any existing `dist` directory will be removed.

| Arguments | Description | Optional? | Default |
|-----------|-------------|-----------|---------|
| `[meta.json]` | Path to `meta.json` | Y | `$PWD/meta.json` |

This command supports the following environment variables:

| Name | Description | Optional? |
|-----------|-------------|-----------|
| `LANDR_MIXPANEL_TOKEN` | Your Mixpanel token | Y |

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

`landr deploy [meta.json]`
--------------------------

Run `landr build [meta.json]` on the current working directory and deploy the
resulting files to Netlify. The content of `dist` are removed after deployment.

| Arguments | Description | Optional? | Default |
|-----------|-------------|-----------|---------|
| `[meta.json]` | Path to `meta.json` | Y | `$PWD/meta.json` |

This command supports the following environment variables:

| Name | Description | Optional? |
|-----------|-------------|-----------|
| `NETLIFY_AUTH_TOKEN` | You Netlify token | N |
| `LANDR_MIXPANEL_TOKEN` | Your Mixpanel token | Y |

### Examples:

```sh
$ cd path/to/repo
$ landr deploy

  / /  __ _ _ __   __| |_ __
 / /  / _` | '_ \ / _` | '__|
/ /__| (_| | | | | (_| | |
\____/\__,_|_| |_|\__,_|_|

Generate great websites for your projects with zero configuration

[landr] Trying to load repository contract from /Users/jviotti/Projects/resin/landr/meta.json
[landr] Running from /Users/jviotti/Projects/resin/landr/meta.json into /Users/jviotti/Projects/resin/landr/dist
...
[landr] Site generated successfully
[landr] Deploying site to https://landr.netlify.com
[landr] Deployed with Landr v4.2.1
[landr] Visit https://landr.netlify.com
[landr] Head over to https://app.netlify.com/sites/landr/settings/domain/setup to setup a different domain
```
