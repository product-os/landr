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

const fs = require('fs')
const tmp = require('tmp')
const scrutinizer = require('scrutinizer')
const Bluebird = require('bluebird')
const puppeteer = require('puppeteer')
const markdown = require('markdown').markdown
const _ = require('lodash')
const createGitinfo = require('gitinfo')

const getScrutinizerData = () => {
  const gitinfo = createGitinfo({
    defaultBranchName: 'master',
    gitPath: process.cwd()
  })

  const owner = gitinfo.getUsername()
  const repo = gitinfo.getName()

  return scrutinizer.remote(`git@github.com:${owner}/${repo}.git`, {
    reference: 'master',
    progress: (state) => {
      console.log(state.percentage)
    }
  }).then((results) => {
    return results
  })
}

const getScreenshot = async (website) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({
    width: 1024,
    height: 768,
    deviceScaleFactor: 2
  })
  await page.goto(website)
  const location = `${tmp.fileSync().name}.png`
  await page.screenshot({
    path: location
  })
  await browser.close()
  const base64 = Buffer.from(fs.readFileSync(location)).toString('base64')
  return `data:image/png;base64,${base64}`
}

// Const getHighlights = (readme) => {
//   const tree = _.tail(markdown.parse(readme))
//   return tree[3].slice(1).map((highlight) => {
//     return {
//       title: highlight.slice(1)[0][1],
//       description: highlight.slice(1)[1].replace(/^:\s+/, '')
//     }
//   })
// }

const parseMarkdown = ({
  filename, contents
}) => {
  const rawData = _.tail(markdown.parse(contents))

  return {
    filename,
    mime: 'text/markdown',

    // eslint-disable-next-line lodash/matches-shorthand
    title: _.last(_.find(rawData, (node) => {
      return node[0] === 'header' && node[1].level === 1
    })
    ),

    data: rawData
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
      faq,
      fork,
      homepage,
      installationSteps,
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
      security,
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
          banner: _.get(logo, [ 'base64' ])
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
        highlights: [],
        installation: installationSteps,

        blog: _.map(blog, ({
          filename, contents
        }) => {
          return parseMarkdown({
            filename, contents
          })
        }),

        docs: {
          latest: version,
          tags: {
            [version]: _.map(docs, ({
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
          usedBy: [
            {
              owner: 'balena-io',
              repo: 'etcher',
              website: 'https://www.balena.io/etcher/',
              description:
                'Flash OS images to SD cards & USB drives, safely and easily',
              screenshot: await getScreenshot('https://www.balena.io/etcher/')
            },
            {
              owner: 'balena-os',
              repo: 'meta-balena',
              website: 'https://www.balena.io/os/',
              description:
                'A host OS tailored for containers, designed for reliability, proven in production',
              screenshot: await getScreenshot('https://www.balena.io/os/')
            },
            {
              owner: 'balena-io',
              repo: 'open-balena',
              website: 'https://www.balena.io/open/',
              description:
                'Open source software to manage connected IoT devices',
              screenshot: await getScreenshot('https://www.balena.io/open/')
            },
            {
              owner: 'balena-os',
              repo: 'balena-engine',
              website: 'https://www.balena.io/engine/',
              description: 'A container engine built for IoT',
              screenshot: await getScreenshot('https://www.balena.io/engine/')
            }
          ]
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
