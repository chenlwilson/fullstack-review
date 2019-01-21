import React from 'react';

const inlineStyle = {
  width:'130px',
  height:'130px',
  borderRadius:'5px'
}

const UserProfile = (props) => (
  <div>
    <h3>
      <img style={inlineStyle} src={ props.user.avatarUrl }></img>
      <br/>
      > { props.user.name }
      </h3>
    <ul>
    <li><a href={ props.user.htmlUrl }>profile</a></li>
    <li>repositories api: { props.user.reposUrl }</li>
    <li>orgnizations api: { props.user.orgsUrl }</li>
    </ul>
  </div>
)

export default UserProfile;