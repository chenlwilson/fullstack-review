import React from 'react';

const inlineStyle = {width:'100px',height:'100px'}

const UserProfile = () => (
  <div>
    <h4>
      <img style={inlineStyle} src='https://avatars0.githubusercontent.com/u/583231?v=3'></img>
      <br/>
      Name: Octocat
      </h4>
    <ul>
    <li><a href='http://www.github.com'>repositories</a></li>
    <li><a href='http://www.github.com'>orginazations</a></li>
    </ul>
  </div>
)

export default UserProfile;