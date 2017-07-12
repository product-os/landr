import React from 'react';
import Link from "gatsby-link"

export default ({ repo }) => {
  return (
    <p className="text-center py-2 my-0 bg-faded">
      We have {repo.forks_count} forks, {repo.stargazers_count} stars.
      <br/>
      <Link to="/changelog">View changelog</Link>
    </p>
  );
};
