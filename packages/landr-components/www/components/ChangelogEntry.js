import React from 'react';
import { Collapse } from 'reactstrap';

const Entry = ({ title, content, collapse, toggle, ...props }) => {
  return (
    <div {...props}>
      <div className="py-2">
        <h2
          onClick={() => {
            toggle(props.id);
          }}
        >
          {title}
        </h2>
        <Collapse isOpen={collapse}>
          <p className="py-2" dangerouslySetInnerHTML={{ __html: content }} />
        </Collapse>
        <hr />
      </div>
    </div>
  );
};

export default Entry;

export const ChangelogQuery = graphql`
fragment Changelog_query on Changelog {
  title
}
`
