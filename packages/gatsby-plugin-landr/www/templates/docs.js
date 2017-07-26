import React from 'react';
require('prismjs/themes/prism-solarizedlight.css');

class Index extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    console.log(post)
    return (
      <div>
        <span>Time to read: {post.timeToRead}</span>
        <div dangerouslySetInnerHTML={{ __html: post.html }} className="post" />
      </div>
    );
  }
}

export default Index;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      timeToRead
      html
    }
  }
`
