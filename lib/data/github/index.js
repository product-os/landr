const Client = require('graphql-client')
const debug = require('debug')('data:github')
module.exports = async ({
  token,
  owner,
  name
}) => {
  debug(token, owner, name)
  return Client({
    url: 'https://api.github.com/graphql',
    headers: {
      Authorization: 'Bearer ' + token
    }
  }).query(`{
    repository(owner:"${owner}", name:"${name}") {
      name
      url
      owner {
        login
        avatarUrl
        url
      }
      description
      codeOfConduct {
        body
        name
      }
      licenseInfo {
        name
        limitations {
          label
          description
          key
        }
      }
      languages(first:5) {
        edges {
          node {
            name
            color
          }
        }
      }
      releases(first:10) {
        edges {
          node {
            url
            name
            createdAt
            tag {
              name
            }
            releaseAssets(first:10) {
              edges {
                node {
                  downloadUrl
                  downloadCount
                  createdAt
                  name
                  contentType
                }
              }
            }
          }
        }
      }
    }
  }`)
}
