import React from 'react';

const RepoList = (props) => {
  return(
    <div>
      <div><a href={props.repoUrl}>{props.repoTitle}</a></div>
    </div>
  )
}

export default RepoList;
