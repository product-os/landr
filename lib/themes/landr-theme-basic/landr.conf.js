module.exports = {
  createPages: (data) => {
    return Object.keys(data.docs).map((key) => `/docs/${key}/`).concat([
      '/',
      '/changelog/'
    ])
  }
}
