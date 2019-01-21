import React from 'react';

const inlineStyle = {
  width:'130px',
  height:'130px',
  borderRadius:'5px'
}

const UserProfile = (props) => (
  <div>
    <h4>
      <img style={inlineStyle} src={ props.user.avatarUrl }></img>
      <br/>
      Name: Octocat
      </h4>
    <ul>
    <li><a href={ props.user.reposUrl }>repositories</a></li>
    <li><a href={ props.user.orgsUrl }>orginazations</a></li>
    </ul>
  </div>
)

export default UserProfile;