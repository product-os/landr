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
const _ = require(`lodash`);

module.exports = async ({ type, store, getNode }) => {
  return {};
  if (type.name !== `Readme`) {
    return {};
  }

  const SectionType = new GraphQLObjectType({
    name: `Section`,
    fields: {
      title: {
        type: GraphQLString,
        resolve(section) {
          return section.title;
        }
      },
      content: {
        type: GraphQLString,
        resolve(section) {
          return section.content;
        }
      },
      html: {
        type: GraphQLString,
        resolve(section) {
          return section.html;
        }
      }
    }
  });

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
      resolve: async readmeNode => {
        const html = await getHtml(getNode(readmeNode.parent).id);
        return html;
      }
    },
    sections: {
      type: new GraphQLList(SectionType),
      args: {
        regex: {
          type: GraphQLString,
          defaultValue: ''
        }
      },
      resolve: async (readmeNode, { regex }) => {
        const allHtmlPromises = readmeNode.sections
          .filter(section => section.title.match(regex))
          .map(section =>
            getHtml(`${readmeNode.id} >>> ${section.title} >>> MarkdownRemark`)
          );
        return Promise.all(allHtmlPromises).then(allHtml => {
          return allHtml.map((html, i) => {
            return {
              ...readmeNode.sections[i],
              html
            };
          });
        });
      }
    }
  };
};
