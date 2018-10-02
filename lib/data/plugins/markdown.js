const _ = require('lodash');
const Promise = require('bluebird');
const remark = require('remark');

const parser = require('remark-parse');
const html = require('remark-html');
const slug = require('remark-slug');
const highlight = require('remark-highlight.js');
const extract = require('remark-extract-frontmatter');
const frontmatter = require('remark-frontmatter');
const yaml = require('yaml');
const GithubSlugger = require('github-slugger');

const SECTION_DEPTH = 2; // The depth value of heading elements in the AST tree

const Remark = Promise.promisifyAll(remark);

const formatPipe = Remark()
  .use(parser)
  .use(frontmatter)
  .use(extract, { name: 'frontmatter', yaml: yaml.parse })
  .use(slug)
  .use(highlight)
  .use(html);

const formatMarkdown = Promise.promisify(formatPipe.process);

module.exports = {
  middleware: (store, action, next) => {
    if (action.payload.markdown) {
      // using the same service for slug generation as `remark-slug` to keep slugs aligned
      const slugger = new GithubSlugger();
      const ast = remark.parse(action.payload.markdown);

      const headings = _(ast.children)
        .filter({ type: 'heading', depth: SECTION_DEPTH })
        .map(heading => {
          const hasChildren = !_.isEmpty(heading.children);
          const hasTitle = _.head(heading.children).type === 'text';

          if (!hasChildren || !hasTitle) {
            return false;
          }

          const sectionTitle = _.head(heading.children).value;

          return {
            title: sectionTitle,
            slug: slugger.slug(sectionTitle),
          };
        })
        .compact()
        .value();

      slugger.reset();

      return formatMarkdown(action.payload.markdown).then(vfile => {
        const payload = {
          ...action.payload,
          html: vfile.contents,
          data: vfile.data,
          headings,
        };
        delete payload.markdown;
        return next({
          ...action,
          payload,
        });
      });
    }
    return next(action);
  },
};
