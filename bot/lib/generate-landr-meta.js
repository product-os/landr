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

const NodeGeocoder = require('node-geocoder')

const _ = require('lodash')

const parseMarkdown = ({
  filename, contents, tableOfContent, frontmatter
}) => {
  const topLevelHeadings =
    tableOfContent &&
    tableOfContent.filter((heading) => {
      return heading.depth === 1
    })
  let title = null

  // Use the first h1 in body as the title
  if (topLevelHeadings && topLevelHeadings.length) {
    title = topLevelHeadings[0].title
  }

  // If we find no h1, then use title in frontmatter
  if (frontmatter && !title && frontmatter.title) {
    title = frontmatter.title
  }

  // If there is no frontmatter, use the file name as the title of the doc
  if (!title) {
    title = filename.split('.')[0]
  }

  return {
    filename,
    frontmatter,
    tableOfContent,
    mime: 'text/markdown',
    title,
    data: {
      markdown: contents
    }
  }
}

const geocoder = NodeGeocoder({
  provider: 'google',
  apiKey: process.env.LANDR_GOOGLE_GEOCODE_KEY
})

const getLatLong = async ({
  city, country
}) => {
  const [ {
    latitude: lat, longitude: lng
  } ] = await geocoder.geocode(
    `${city}, ${country}`
  )
  return {
    lat,
    lng,
    aye: 'captain'
  }
}

exports.run = async (scrutinizerData) => {
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
    leftoverSections,
    introduction,
    logoBrandMark,
    latestPreRelease,
    latestRelease,
    license,
    logo,
    maintainers,
    motivation,
    name,
    owner,
    tagline,
    setup,
    deployWithBalenaUrl,
    netlifyConfig,

    // Public is a reserved keyword
    public: isPublic,
    repositoryUrl,
    screenshot,
    security,
    softwareRequired,
    stars,
    balena,
    version,
    orgLogoFull,
    orgLogoBrandmark,
    contract,
    teamMembers
  } = scrutinizerData

  const data = {
    slug: name,
    type: 'repository',
    version,
    markers: [],
    tags: [],
    links: {},
    active,
    netlifyConfig,
    data: {
      license,
      name,
      tagline,
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
        architecture: architecture
          ? parseMarkdown({
            filename: 'ARCHITECTURE.md',
            contents: architecture
          })
          : null,
        guide: contributing
          ? parseMarkdown({
            filename: 'CONTRIBUTING.md',
            contents: contributing
          })
          : null,
        codeOfConduct: codeOfConduct
          ? parseMarkdown({
            filename: 'CODE_OF_CONDUCT.md',
            contents: codeOfConduct
          })
          : null,
        security: security
          ? parseMarkdown({
            filename: 'SECURITY.md',
            contents: security
          })
          : null
      },
      motivation,
      introduction,
      hardwareRequired,
      softwareRequired,
      highlights,
      readmeLeftover,
      leftoverSections,
      setup,
      deployWithBalenaUrl,
      screenshot,
      installation: installationSteps,
      logoBrandMark,
      balena: {
        ...balena,
        yml: balena.yml
          ? {
            ...balena.yml,
            data: balena.yml.data
              ? {
                ...balena.yml.data,
                ...(await getLatLong(balena.yml.data))
              }
              : {}
          }
          : null
      },
      contract,

      // TODO autodetect if the project is a CLI tool in scrutinizer
      isCli: false,
      isHumanRepo: balena && balena.yml && balena.yml.type === 'human',

      blog: _.map(
        blog,
        ({
          filename, contents, tableOfContent, frontmatter
        }) => {
          return parseMarkdown({
            filename,
            contents,
            tableOfContent,
            frontmatter
          })
        }
      ),

      docs: {
        latest: version,
        tags: {
          [version]: _.map(docs, ({
            filename, contents, tableOfContent
          }) => {
            return parseMarkdown({
              filename,
              contents,
              tableOfContent
            })
          })
        }
      },

      github: {
        public: isPublic,
        fork,
        stars,
        owner: {
          logo: orgLogoFull,
          logoBrandmark: orgLogoBrandmark,
          handle: owner.handle,
          type: owner.type,
          name: owner.handle,
          // eslint-disable-next-line max-len
          description:
            'Balena brings the benefits of Linux containers to the IoT. Develop iteratively, deploy safely, and manage at scale.',
          url: owner.url,
          email: 'hello@balena.io',
          avatar: owner.avatar
        },
        usedBy: examples
      },
      contributors: contributors
        .filter((contributor) => {
          return !contributor.username.endsWith('[bot]')
        })
        .sort((contributorA, contributorB) => {
          return contributorB.contributions - contributorA.contributions
        }),
      releases: {
        latestRelease,
        latestPreRelease
      },
      teamMembers
    }
  }

  return data
}
