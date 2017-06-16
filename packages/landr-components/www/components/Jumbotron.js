import React from 'react';
import { Jumbotron } from 'reactstrap';

export default ({ title, lead, logo, badges }) => {
  return (
    <Jumbotron className="mb-0">
      <div className="container">
        <h1 className="display-3">{title}</h1>
        <p className="lead" dangerouslySetInnerHTML={{ __html: lead }} />
        <hr className="my-2" />
        {logo && <img style={{ maxWidth: '400px' }} src={logo} />}
        <p>Check out all my badges</p>
        <p dangerouslySetInnerHTML={{ __html: badges }} />
      </div>
    </Jumbotron>
  );
};
