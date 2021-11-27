<p align="center">
	<img src="./landr.svg" height="160" />
</p>

**Generate great websites for your projects with zero configuration.**

Landr is balena's static site generator that helps edge developers and product builders create quick, usable websites. It uses open source standards, so that as long as the developer uses those conventions, they'll get a nice site. This means they can focus on building their product rather than maintaining their site, blog posts, docs, and versioning.

Our popular test sites in the wild include [balenaSound](https://sound.balenalabs.io/) and [balenaSense](https://sense.balenalabs.io/), with more tests to come. We're also testing Landr sites for some balenaBlocks.

**Landr is alpha software** and its under heavy development, so various things
might be broken in its best case! We warmly welcome [new, detailed issues](https://github.com/product-os/landr/issues) and [contributions](https://github.com/balena-io/landr/blob/master/CONTRIBUTING.md) to help us improve Landr.

## Highlights

- **Fast, functional Websites**: Landr renders your project and its documentation in
  a gorgeous and UX-friendly way to your end users, so you can focus on shipping features.
- **Follows OSS Conventions**: Landr understands most common repository
  conventions, and fully makes use of them. Build a great repository and get a
  great website for it: its a win-win!
- **Fully Automatic**: Landr requires zero configuration. It's smart
  enough to figure out what it needs on its own. Point it to a repository, hold
  tight, and let Landr do its magic.

## Installation

1. Install the Landr CLI:
   ```bash
   npm install --global landr
   ```
2. Go to a Balena CI powered repo:
   ```bash
   cd path/to/repository
   ```
3. Generate your website:
   ```bash
   landr
   ```

[Head over to our docs!](https://github.com/balena-io/landr/tree/master/docs)

## Motivation

Creating a website for a project can be hard and time-consuming. Landr aims to simplify how developers can quickly create usable, beautiful websites to share their projects with the world. It does so with open source standards in mind and with zero overhead.

Build a great, well-structured project and let Landr build you a great site.

### Usage

```bash
$ npm install -g landr
$ landr COMMAND
running command...
$ landr (-v|--version|version)
landr/6.16.0 darwin-x64 node-v12.18.3
$ landr --help [COMMAND]
USAGE
  $ landr COMMAND
```

#### Commands

- [`landr build`](#landr-build)
- [`landr help [COMMAND]`](#landr-help-command)
- [`landr meta`](#landr-meta)

##### `landr build`

Build a static site using landr

```bash
USAGE
  $ landr build

OPTIONS
  -d, --deploy         Deploy the site to netlify after generating it
  -m, --meta=meta      The location of the meta file used to generate your landr site
  -o, --output=output  The output directory where we should generate your landr site
  -v, --verbose        Run in verbose mode

DESCRIPTION
  Build a static site using landr into a local directory.
  By default this command will look for a meta.json file in the current directory
  to use as data for generating the site. The location of the data file can be
  specified using the -m flag.
  By default the site will be written to a folder named landr-dist in the current
  directory. The location that the site will be written to can be specified using
  the -o flag.
  You can also optionally deploy your site to netlfiy using the -d flag. Deploying
  to netlify relies on providing the NETLIFY_AUTH_TOKEN env var.
```

_See code: [lib/cli/commands/build.js](https://github.com/balena-io/landr/blob/v6.16.0/lib/cli/commands/build.js)_

##### `landr help [COMMAND]`

display help for landr

```bash
USAGE
  $ landr help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

##### `landr meta`

Generate a meta file

```bash
USAGE
  $ landr meta

OPTIONS
  -o, --output=output  The output path where the metadata should be written

DESCRIPTION
  Generate a meta file that contains all the information landr needs to generate a site.
```

_See code: [lib/cli/commands/meta.js](https://github.com/balena-io/landr/blob/v6.16.0/lib/cli/commands/meta.js)_

## Examples

- [balenaSound](https://sound.balenalabs.io/) - balenaSound fleet
- [balenaSense](https://sense.balenalabs.io/) - balenaSense fleet
- [balenaltd](https://balenaltd.com/) - balena's org site with team pages

## Getting Help

If you're having any problem, please [raise an
issue](https://github.com/balena-io/landr/issues/new) on GitHub and the Landr
team will be happy to help.

## Contributing

Do you want to help make Landr better? Take a look at our [Contributing
Guide](https://github.com/balena-io/landr/blob/master/CONTRIBUTING.md). Hope to
see you around!

## License

Landr is free software, and may be redistributed under the terms specified in
the [license](https://github.com/balena-io/landr/blob/master/LICENSE).
