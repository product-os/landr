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
const Bluebird = require('bluebird')
const puppeteer = require('puppeteer')
const markdown = require('markdown').markdown
const _ = require('lodash')
const path = require('path')
const fetch = require('node-fetch')
const PROJECT_DIRECTORY = path.resolve(__dirname, '..')

const getScrutinizerData = ({owner, repo}) => {
  return fetch(`https://raw.githubusercontent.com/${owner}/${repo}/gh-pages/scrutinizer.json`)
    .then(res => res.json())
    .catch(err => console.log(err))
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


const parseFAQ = (text) => {
  const tree = _.tail(markdown.parse(text))
  const result = []

  tree.forEach((node, index) => {
    if (node[0] === 'header') {
      result.push({
        title: _.last(node),
        content: tree[index + 1]
      })
    }
  })

  return result
}

const normalize = (file, jsonml) => {
  return jsonml.map((node) => {
    const content = _.last(node)

    if (node[0] === 'img') {
      Reflect.deleteProperty(node[1], 'alt')
      const imagePath = path.resolve(path.dirname(file), node[1].href)
      const base64 = Buffer.from(fs.readFileSync(imagePath)).toString('base64')
      node[1].href = `data:image/png;base64,${base64}`
    }

    if (Array.isArray(content)) {
      node[node.length - 1] = _.first(normalize(file, [ content ]))
    }

    return node
  })
}

const parseMarkdown = (file) => {
  const tree =
    normalize(path.join(PROJECT_DIRECTORY, file),
      _.tail(markdown.parse(fs.readFileSync(
        path.join(PROJECT_DIRECTORY, file), 'utf8'))))
  return {
    filename: file,
    mime: 'text/markdown',

    // eslint-disable-next-line lodash/matches-shorthand
    title: _.last(_.find(tree, (node) => {
      return node[0] === 'header' && node[1].level === 1
    })),

    data: tree
  }
}

Bluebird.resolve().then(async () => {

  const scrutinizerData = await getScrutinizerData({
    owner: 'balena-io',
    repo: 'landr'
  })

  // Unused keys -> readme, lastCommitDate, dependencies
  const {
    name,
    public,
    fork,
    license,
    description,
    version,
    latestRelease,
    latestPreRelease,
    contributing,
    architecture,
    changelog,
    codeOfConduct,
    installationSteps,
    motivation,
    stars,
    owner
  } = scrutinizerData

  const data = {
    slug: name,
    type: 'repository',
    version: version,
    markers: [],
    tags: [],
    links: {},
    active: true,
    data: {
      license: license,
      name: name,
      tagline: description,
      images: {
        // Image at the top README
        banner: `data:image/png;base64,${Buffer.from(fs.readFileSync('./banner.png')).toString('base64')}`
      },
      description: require(path.join(PROJECT_DIRECTORY, 'package.json')).description,
      version: require(path.join(PROJECT_DIRECTORY, 'package.json')).version,

      // Using Detectorist
      type: 'npm',

      vcs: {
        type: 'git',
        branch: 'master'
      },
      links: {
        issueTracker: require(path.join(PROJECT_DIRECTORY, 'package.json')).bugs.url,
        homepage: 'https://www.balena.io/landr',
        repository: require(path.join(PROJECT_DIRECTORY, 'package.json')).repository.url
          .replace(/^git\+/, '')
          .replace(/\.git$/, '')
      },
      dns: {
        cname: fs.readFileSync(path.join(PROJECT_DIRECTORY, 'CNAME'), 'utf8')
          .replace(/\n/g, '')
      },
      maintainers: _.uniq(fs.readFileSync(path.join(PROJECT_DIRECTORY, 'CODEOWNERS'), 'utf8')
        .match(/@[\S]+/g)).map((name) => {
        return name.slice(1)
      }),

      changelog: changelog,

      faq: parseFAQ(fs.readFileSync(path.join(PROJECT_DIRECTORY, 'FAQ.md'), 'utf8')),

      contributing: {
        architecture: architecture ? parseMarkdown(architecture) : null,
        guide: contributing ? parseMarkdown(contributing) : null,
        codeOfConduct: codeOfConduct ? parseMarkdown(codeOfConduct) : null,
        security: parseMarkdown('SECURITY.md')
      },

      motivation: motivation,
      highlights: highlights,
      installation: installationSteps,

      blog: [
        Object.assign(parseMarkdown('blog/2019-07-08-hello-from-landr.md'), {
          // We can obtain these from the git history
          published_at: '2019-07-08T19:19:00.016Z',
          author: {
            handle: 'jviotti'
          }
        })
      ],

      docs: {
        latest: '1.0.0',
        tags: {
          '1.0.0': [
            parseMarkdown('docs/01-getting-started.md'),
            parseMarkdown('docs/02-cli.md'),
            parseMarkdown('docs/03-conventions.md'),
            parseMarkdown('docs/04-running-landr-in-ci.md')
          ],
          '0.1.1': [
            parseMarkdown('docs/01-getting-started.md'),
            parseMarkdown('docs/02-cli.md'),
            parseMarkdown('docs/03-conventions.md'),
            parseMarkdown('docs/04-running-landr-in-ci.md')
          ],
          '0.1.0': [
            parseMarkdown('docs/01-getting-started.md'),
            parseMarkdown('docs/02-cli.md'),
            parseMarkdown('docs/03-conventions.md'),
            parseMarkdown('docs/04-running-landr-in-ci.md')
          ]
        }
      },

      github: {
        public: public,
        fork: fork,
        stars: stars,
        owner: {
          handle: owner.handle,
          type: owner.type,
          name: owner.handle,
          // eslint-disable-next-line max-len
          description: 'Balena brings the benefits of Linux containers to the IoT. Develop iteratively, deploy safely, and manage at scale.',
          url: owner.url,
          email: 'hello@balena.io',
          avatar: `data:image/png;base64,${Buffer.from(fs.readFileSync('./owner.png')).toString('base64')}`
        },
        usedBy: [
          {
            owner: 'balena-io',
            repo: 'etcher',
            website: 'https://www.balena.io/etcher/',
            description: 'Flash OS images to SD cards & USB drives, safely and easily',
            screenshot: await getScreenshot('https://www.balena.io/etcher/')
          },
          {
            owner: 'balena-os',
            repo: 'meta-balena',
            website: 'https://www.balena.io/os/',
            description: 'A host OS tailored for containers, designed for reliability, proven in production',
            screenshot: await getScreenshot('https://www.balena.io/os/')
          },
          {
            owner: 'balena-io',
            repo: 'open-balena',
            website: 'https://www.balena.io/open/',
            description: 'Open source software to manage connected IoT devices',
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
      contributors: [
        {
          username: 'jviotti',
          avatar: 'https://avatars2.githubusercontent.com/u/2192773'
        },
        {
          username: 'lucianbuzzo',
          avatar: 'https://avatars2.githubusercontent.com/u/15064535'
        },
        {
          username: 'dimitrisnl',
          avatar: 'https://avatars2.githubusercontent.com/u/4951004'
        }
      ],
      releases: {
        latestRelease,
        latestPreRelease
      }
    }
  }

  return fs.writeFile("meta.json", JSON.stringify(data), (err) => {
    if(err) {
        return console.log(err);
    }
});

}).catch((error) => {
  console.error(error)
  process.exit(1)
})
