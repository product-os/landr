"use strict";

var _require = require(`graphql`),
    GraphQLObjectType = _require.GraphQLObjectType,
    GraphQLList = _require.GraphQLList,
    GraphQLString = _require.GraphQLString,
    GraphQLInt = _require.GraphQLInt,
    GraphQLEnumType = _require.GraphQLEnumType;

module.exports = function (_ref, pluginOptions) {
  var type = _ref.type,
      allNodes = _ref.allNodes,
      linkPrefix = _ref.linkPrefix,
      getNode = _ref.getNode,
      cache = _ref.cache;

  if (type.name !== `Readme`) {
    return {};
  }

  var files = allNodes.filter(function (n) {
    return n.internal.type === `Readme`;
  });

  return {
    title: {
      type: GraphQLString
    },
    lead: {
      type: GraphQLString
    },
    badges: {
      type: GraphQLString
    },
    images: {
      type: GraphQLObjectType
    },
    installation: {
      type: GraphQLObjectType
    },
    features: {
      type: GraphQLObjectType
    },
    contribute: {
      type: GraphQLObjectType
    },
    license: {
      type: GraphQLObjectType
    }
  };
};