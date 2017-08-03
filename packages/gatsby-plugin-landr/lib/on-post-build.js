const path = require('path');

module.exports = ({ store }) => {
  // Create a slug field for every markdown page created.
  console.log(store.getState().pages);
};
