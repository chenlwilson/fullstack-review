import React from 'react';
import RepoEntry from './RepoEntry.jsx'
import UserProfile from './UserProfile.jsx'

const inlineTR = {
  width: '2000px',
  margin: '20px',
  color: 'pink',
  backgroundColor: 'grey',
  borderColor: 'white',
  height: '30px',
  textAlign: 'center',
  fontSize: '14px'
}

const RepoList = (props) => (
  <div>
      <UserProfile />
      <h4>Woot! Latest { props.repos.length } Repos Found.</h4>
    <table>
      <tbody>
        <tr style={inlineTR}>
          <th>Repository</th>
          <th>Created</th>
          <th>Last Updated</th>
          <th>Language</th>
          <th>Size</th>
          <th>Forks</th>
          <th>Watchers</th>
          <th>Default Branch</th>
          <th>Collaborators</th>
        </tr>
        { props.repos.map((repo) =>
          <RepoEntry data={repo} key={repo._id}/>
        ) }
      </tbody>
    </table>
  </div>
)

export default RepoList;