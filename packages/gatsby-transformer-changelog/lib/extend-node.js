// hack to get around lerna module resolution
function requireModule(module) {
  try {
    return require(module);
  } catch (e) {
    // we're in dev mode
    return require(`../../landr/node_modules/${module}`);
  }
}

const {
  GraphQLInt,
  GraphQLString,
  graphql,
  GraphQLList,
  GraphQLObjectType
} = requireModule(`graphql`);

// TODO fix ^.
const _ = require(`lodash`);

module.exports = async ({ type, store, getNode }) => {
  if (type.name !== `Changelog`) {
    return {};
  }

  // TODO we should get gatsby to pass graphqlRunner
  // to api.setFieldsOnGraphQLNodeType
  const graphqlRunner = (query, context = {}) => {
    const schema = store.getState().schema;
    return graphql(schema, query, context, context, context);
  };

  const getHtml = id => {
    return graphqlRunner(
      `
      {
        markdownRemark(id: { eq: "${id}" }) {
          html
        }
      }
      `
    ).then(result => {
      if (result.error) {
        throw Error(result.error);
      }
      return result.data.markdownRemark.html;
    });
  };

  return {
    html: {
      type: GraphQLString,
      resolve: async changelogNode => {
        const html = await getHtml(`${changelogNode.id} >>> MarkdownRemark`);
        return html;
      }
    }
  };
};
