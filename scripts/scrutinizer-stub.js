/*
 * Copyright 2019 balena.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// const puppeteer = require('puppeteer')
// const tmp = require('tmp')

const fs = require('fs')
const scrutinizer = require('scrutinizer')
const Bluebird = require('bluebird')
const markdown = require('markdown').markdown
const last = require('lodash/last')
const find = require('lodash/find')
const get = require('lodash/get')
const map = require('lodash/map')
const tail = require('lodash/tail')
const createGitinfo = require('gitinfo')
const gitBranch = require('git-branch')

const getScrutinizerData = async () => {
  const gitinfo = createGitinfo({
    defaultBranchName: 'master',
    gitPath: process.cwd()
  })

  const owner = gitinfo.getUsername()
  const repo = gitinfo.getName()
  const branch = await gitBranch(process.cwd())

  const results = await scrutinizer.remote(`git@github.com:${owner}/${repo}.git`, {
    reference: branch,
    progress: (state) => {
      console.log(state.percentage)
    }
  })

  return results
}

const parseMarkdown = ({
  filename, contents
}) => {
  const rawData = tail(markdown.parse(contents))

  return {
    filename,
    mime: 'text/markdown',

    // eslint-disable-next-line lodash/matches-shorthand
    title: last(find(rawData, (node) => {
      return node[0] === 'header' && node[1].level === 1
    })
    ),

    data: {
      markdown: contents,
      jsonml: rawData
    }
  }
}

Bluebird.resolve()
  .then(async () => {
    const scrutinizerData = await getScrutinizerData()

    // Unused keys -> readme, lastCommitDate, dependencies
    const {
      active,
      architecture,
      blog,
      changelog,
      codeOfConduct,
      contributing,
      contributors,
      description,
      docs,
      examples,
      faq,
      fork,
      hardwareRequired,
      highlights,
      homepage,
      installationSteps,
      introduction,
      latestPreRelease,
      latestRelease,
      license,
      logo,
      maintainers,
      motivation,
      name,
      owner,

      // Public is a reserved keyword
      public: isPublic,
      repositoryUrl,
      screenshot,
      security,
      softwareRequired,
      stars,
      version
    } = scrutinizerData

    const data = {
      slug: name,
      type: 'repository',
      version,
      markers: [],
      tags: [],
      links: {},
      active,
      data: {
        license,
        name,
        tagline: description,
        images: {
          banner: get(logo, [ 'base64' ])
        },
        description,
        version,

        // Using Detectorist
        type: 'npm',

        links: {
          issueTracker: null,
          homepage,
          repository: repositoryUrl
        },
        maintainers,

        changelog,

        faq,

        contributing: {
          architecture: architecture ? parseMarkdown({
            filename: 'ARCHITECTURE.md',
            contents: architecture
          }) : null,
          guide: contributing ? parseMarkdown({
            filename: 'CONTRIBUTING.md',
            contents: contributing
          }) : null,
          codeOfConduct: codeOfConduct ? parseMarkdown({
            filename: 'CODE_OF_CONDUCT.md',
            contents: codeOfConduct
          }) : null,
          security: security ? parseMarkdown({
            filename: 'SECURITY.md',
            contents: security
          }) : null
        },
        motivation,
        introduction,
        hardwareRequired,
        softwareRequired,
        highlights,
        screenshot,
        installation: installationSteps,

        blog: map(blog, ({
          filename, contents
        }) => {
          return parseMarkdown({
            filename, contents
          })
        }),

        docs: {
          latest: version,
          tags: {
            [version]: map(docs, ({
              filename, contents
            }) => {
              return parseMarkdown({
                filename, contents
              })
            })
          }
        },

        github: {
          public: isPublic,
          fork,
          stars,
          owner: {
            handle: owner.handle,
            type: owner.type,
            name: owner.handle,
            // eslint-disable-next-line max-len
            description: 'Balena brings the benefits of Linux containers to the IoT. Develop iteratively, deploy safely, and manage at scale.',
            url: owner.url,
            email: 'hello@balena.io',
            avatar: owner.avatar
          },
          usedBy: examples
        },
        contributors,
        releases: {
          latestRelease,
          latestPreRelease
        }
      }
    }

    // eslint-disable-next-line
    return fs.writeFile('meta.json', JSON.stringify(data), (err) => {
      if (err) {
        return console.log(err)
      }
    })
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
