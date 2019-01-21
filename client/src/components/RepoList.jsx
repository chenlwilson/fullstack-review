import React from 'react';
import RepoEntry from './RepoEntry.jsx'

const inlineTB = {
  width: '1000px',
  margin: '20px'
}
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
    <h4>Woot! { props.repos.length } Repos Found.</h4>
    <table style={inlineTB}>
      <tbody>
        <tr style={inlineTR}>
          <th>Owner</th>
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
        )}
      </tbody>
    </table>
  </div>
)

export default RepoList;