import React from 'react';

export default ({ title, content, children, ...props }) => {
  return (
    <div {...props}>
      <div className="container py-2">
        <h2>{title}</h2>
        <p dangerouslySetInnerHTML={{ __html: content }} />
        {children}
      </div>
    </div>
  );
};
