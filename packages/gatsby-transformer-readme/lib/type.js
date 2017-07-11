const SECTION_TYPE = {
  title: '',
  content: ''
};

// this way we always produce the same object shape, no matter if the data exits.
// we could extend the node with the required field types later but this is a simpler approach.

module.exports = {
  title: '',
  lead: '',
  badges: '',
  installation: SECTION_TYPE,
  images: {
    screenshot: '',
    logo: ''
  },
  features: SECTION_TYPE,
  license: SECTION_TYPE
};
