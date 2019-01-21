import React from 'react';
import RepoEntry from './RepoEntry.jsx'
import UserProfile from './UserProfile.jsx'

const RepoList = (props) => (
  <div>
      <UserProfile />
    <h4>Woot! {props.repos.length} Repos Found.</h4>
    <ul>
    <RepoEntry />
    <RepoEntry />
    <RepoEntry />
    </ul>
  </div>
)

export default RepoList;