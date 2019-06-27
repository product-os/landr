Landr CLI
=========

The Landr CLI is able to generate websites and deploy them to Netlify.

- `landr`: Generate a website out of the current repo, attempting to find a
  `meta.json` file in the current branch and deploy it to Netlify, creating a
  site and prompting the user for login if needed

- `landr build <output directory>`: Only generate a website out of the current
  repo, attempting to find a `meta.json` file in the current branch
