import React from 'react';

const inlineStyle = {
  width:'150px',
  height:'150px',
  borderRadius:'5px'
}

const UserProfile = (props) => (
  <div>
    <h3>
      <img style={inlineStyle} src={ props.user.avatarUrl }></img><br/>
      <caption>
        >.
        <a href={ props.user.htmlUrl }>{ props.user.name }</a>
        </caption>
      </h3>
  </div>
)

export default UserProfile;