import React from 'react';
import { Jumbotron } from 'reactstrap';

export default ({ repo }) => {
  return (
    <Jumbotron className="mb-0">
      <div className="container">
        <h1 className="display-3">{repo.name}</h1>
        <p className="lead">{repo.description}</p>
        <hr className="my-2" />
      </div>
    </Jumbotron>
  );
};
