'use strict';
const _ = require('lodash');
const reg = require('./regex');

const extractContent = function *(tokens, index) {
  const content = _.find(tokens, 'content', index).content;
  yield content;
};

exports.byType = function(tokens, type) {
  const arr = [];
  let index = 0;
  while (index !== -1) {
    index = _.findIndex(tokens, function(t) {
      if (t.type === type) {
        return t;
      }
    }, index);
    if (index !== -1) {
      arr.push(extractContent(tokens, index).next().value);
      index += 1;
    }
  }
  return arr;
};

exports.imageByAlt = function(tokens, alt) {
  const logo = _.find(tokens, function(t) {
    const regx = new RegExp(`\\!\\[(${alt})\\]`, 'gi');
    return t.content.match(regx);
  });
  if (logo) {
    return logo.content.toLowerCase().match(reg.href)[0];
  }
};

exports.getNav = function(tokens) {
  const links = _.find(tokens, function(t) {
    if (t.content.indexOf('nav-') > -1) {
      return t;
    }
  });
  return exports.byType(links.children, 'link_open');
};
