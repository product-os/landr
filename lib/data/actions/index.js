function addDoc(payload) {
  return {
    type: 'ADD_DOC',
    payload
  }
}

function addChangelog(payload) {
  return {
    type: 'ADD_CHANGELOG',
    payload
  }
}

function addRepository(payload) {
  return {
    type: 'ADD_REPOSITORY',
    payload
  }
}

function addRelease(payload) {
  return {
    type: 'ADD_RELEASE',
    payload
  }
}

function addContributor(payload) {
  return {
    type: 'ADD_CONTRIBUTOR',
    payload
  }
}

const actions = {
  addDoc,
  addChangelog,
  addRepository,
  addContributor,
  addRelease
}

module.exports = actions
