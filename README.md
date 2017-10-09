# landr

source code = website!

> Build a website for your software projects with one command.

## How it works

When you run landr on your local repository, it gathers info by leveraging standard conventions.
It'll first look for a git remote from `github.com` and retrieve some basic information about your project from the github api (`contribution stats`, `releases`), it will then parse standard files like `README.md`, `CHANGELOG.md`, `CONTRIBUTING.md` & `/docs`, it'll then use the data to build out beautiful pages for your website.

This allows the maintenance of your website to be a side effect of keeping your software project inline with standard github conventions.

## Quick start guide

Install:
```
npm i -g landr
```

From the root of your local `.git` repo run:
```
landr
```

Visit `http://localhost:3000`.

`prefixPaths` flag is useful when deploying to gh-pages where you need the `/<repository-name>` prefixed.
```
landr build --prefixPaths
```

Deploy to github pages:
```
landr deploy
```

### Configuration

I know, we said there is zero configuration, but there are some cases where configuration is necessary for example if you need to add analytics tokens, or ignore certain files.

landr allows configuration via a `landr.conf.js` file the repository root it must export a config object.

```js
// landr.conf.js
module.exports = {
  analytics: {
    mixpanel: <mixpanel-id>
    googleAnalytics: <ga-id>
  }
}
```

## Why landr

You have to maintain your source code why maintain a website too?

As a software company we have a growing number of websites to build and maintain. We built landr so we could focus on our projects and not their websites.

Most OS websites the same, the have a hero, a getting started and some docs. There is definitely room for automation.


## Contributing

```
npm i
```

```
npm link
```

Get to work. 👷

## License

Landr is free software, and may be redistributed under the terms specified in the [license](LICENSE).
