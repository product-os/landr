const _ = require('lodash');
const helpers = require('./helpers');
const regex = require('./regex');

_.mixin({
  getContent: (val) => {
    const hasContent = (token) => _.has(token, 'content') ? token.content : null

    if (_.isArray(val)) {
      return val.map(t => {
        return hasContent(t)
      })
    }
    return hasContent(val)
  },
  filterByType: (array, type) => array.filter((token, i) => {
    return helpers.typeIs(array[i - 1], `${type}_open`);
  }),
  getUrl: (val) => {
    if (val) {
      return val.match(regex.href)[0];
    }
    return null;
  }
})

module.exports = _
