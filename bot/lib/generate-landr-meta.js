/*
 * Copyright 2020 balena.io
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

const markdown = require('markdown').markdown
const _ = require('lodash')

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

    data: {
      markdown: contents,
      jsonml: rawData
    }
  }
}

exports.run = (scrutinizerData) => {
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
    readmeLeftover,
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
        banner: _.get(logo, [ 'base64' ]),
        bannerText: _.get(logo, [ 'textContent' ])
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
      readmeLeftover,
      screenshot,
      installation: installationSteps,

      // TODO autodetect if the project is a CLI tool in scrutinizer
      isCli: false,

      blog: _.map(blog, ({
        filename, contents
      }) => {
        return parseMarkdown({
          filename,
          contents
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
        usedBy: examples
      },
      contributors: contributors
        .filter((contributor) => {
          return !contributor.username.endsWith('[bot]')
        }).sort((contributorA, contributorB) => {
          return contributorB.contributions - contributorA.contributions
        }),
      releases: {
        latestRelease,
        latestPreRelease
      }
    }
  }

  return data
}
