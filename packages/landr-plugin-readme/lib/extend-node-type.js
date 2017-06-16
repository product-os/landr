const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLEnumType
} = require(`graphql`);

module.exports = (
  { type, allNodes, linkPrefix, getNode, cache },
  pluginOptions
) => {
  if (type.name !== `Readme`) {
    return {};
  }

  const files = allNodes.filter(n => n.internal.type === `Readme`);

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
