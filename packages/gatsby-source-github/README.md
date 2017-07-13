## gatsby-source-github

This source plugin will create a `Repo` node with info pulled from the github API.

## usage

```
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-github`,
    options: {
      user: `resin-io`,
      repo: `landr`,
    },
  }
]
```

## API limitations

We only fetch refresh data from API if 10 minutes has elapsed since the last dev build, or if you change the config.

For production builds we refetch the data every time.

If you are switching between sites a lot or making other github requests you may hit the github `API rate limit exceeded` error.

To get around this make add a `GH_TOKEN` environment variable.

```
GH_TOKEN=****** landr develop
```
