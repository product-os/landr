'use strict';
const _ = require('lodash');
const reg = require('./regex');
const md = require('./md');

const contentUntil = (tokens, tag) => {
  const content = _.takeWhile(_.drop(tokens, 3), (n) => {
    return n.tag !== tag;
  });

  if (_.has(tokens[1], 'content')) {
    const node = {};
    node.title = tokens[1].content;
    node.content = exports.parseTokens(content);
    return node;
  }
  return;
};

exports.divideByTag = (tokens, tag) => {
  const arr = [];
  let index = 0;
  while (index !== -1) {
    index = _.findIndex(tokens, (t) => {
      return t.tag === `${tag}`;
    }, index);
    if (index !== -1) {
      arr.push(contentUntil(_.slice(tokens, index), tag));

      // each tag has 3 nodes opening/inline/closing so add 3
      index += 3;
    }
  }
  return arr;
};

exports.filterByTag = (tokens, tag) => {
  return tokens.reduce(function(acc, n, i) {
    if (n.tag === tag && n.nesting === 1) {
      acc.push(tokens[i + 1].content);
    }
    return acc;
  }, []);
};

exports.findByRegex = (tokens, regex) => {
  return _.find(tokens, (t) => {
    const regx = new RegExp(regex, 'gi');
    return t.content.match(regx);
  });
};

exports.imageByAlt = (tokens, alt) => {
  const logo = exports.findByRegex(tokens, `\\!\\[(${alt})\\]`);
  if (logo) {
    return logo.content.toLowerCase().match(reg.href)[0];
  }
};

exports.parseTokens = (tokens) => {
  return md.renderer.render(tokens, {}, {});
};
