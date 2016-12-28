'use strict';
module.exports = (test) => {
  return `
  <a href='#'
  onclick=${console.log('hi')}>${'adsf'}</a>
  `;
};
