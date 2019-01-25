import React from 'react';
import RepoEntry from './RepoEntry.jsx'

const inlineTB = {
  width: '1200px',
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

class RepoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const avatar = this.props.user.avatarUrl
    let message

    if ( avatar === './blackwhiteicon.png') {
      message = <h4>Oops...no repositories found</h4>
    } else {
      message = <h4>Woot! { this.props.repos.length } Most { this.props.msg } Repos Found.</h4>
    }

    return (
      <div>
        {message}
        <table style={inlineTB}>
          <tbody>
            <tr style={inlineTR}>
              <th>Owner</th>
              <th>Repository</th>
              <th>Forks</th>
              <th>Created</th>
              <th>Last Updated</th>
              <th>Language</th>
              <th>Size</th>
              <th>Watchers</th>
              <th>Default Branch</th>
            </tr>
          { this.props.repos.map((repo) =>
              <RepoEntry data={repo} key={repo._id}/>
            )}
          </tbody>
        </table>
      </div>
    )
  }

}

export default RepoList;