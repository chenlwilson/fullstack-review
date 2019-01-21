import React from 'react';

const inlineTR = {
  width: '1200px',
  margin: '20px',
  color: 'grey',
  backgroundColor: 'white',
  height: '20px',
  textAlign: 'left',
  fontSize: '12px'
}

const RepoEntry = (props) => {

  return (
  <tr style={inlineTR}>
    <td><a src={ props.data.htmlUrl }>{ props.data.name }</a></td>
    <td>{ props.data.createdAt }</td>
    <td>{ props.data.updatedAt }</td>
    <td>{ props.data.language }</td>
    <td>{ props.data.size }</td>
    <td>{ props.data.forksCount }</td>
    <td>{ props.data.watchersCount }</td>
    <td>{ props.data.defaultBranch }</td>
    <td><a src={ props.data.collabsUrl }>collaborators</a></td>
  </tr>
  )
}

export default RepoEntry;