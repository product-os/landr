import React from 'react';

export default ({ repo }) => {
  return (
    <p className="text-center py-2 my-0 bg-faded">
      We have {repo.forks_count} forks, {repo.stargazers_count} stars.
    </p>
  );
};
