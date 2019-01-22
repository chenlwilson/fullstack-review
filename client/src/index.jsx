import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import UserProfile from './components/UserProfile.jsx'

class App extends React.Component {
  constructor(props) {

    super(props);

    this.search = this.search.bind(this);
    this.loadRepos = this.loadRepos.bind(this);

    this.state = {
      repos: [],
      user: '',
      search: 'Popular'
    }

  }

  componentDidMount() {
    this.loadRepos();
    this.setState({
      search: 'Popular'
    })
  }

  loadRepos() {
    $.ajax({
      url: '/',
      type: 'GET',
      contentType: 'text/plain'
    })
    .done((data) => {
      console.log('load repos success! ')
      console.log(data)
      this.setState({
        repos: data,
        user: data[0].userId
      })
    })
    .fail(() => {
      console.log('load repos failed!')
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    //$.ajax post to '/repos'
    $.ajax({
      url: '/',
      type: 'POST',
      contentType: 'text/plain',
      data: term
    })
    .done((data) => {
      console.log('fecth repos success!')
      this.setState({
        repos: data,
        search: 'Recent',
        user: data[0].userId
      })
    })
    .fail(() => {
      console.log('fetch repos failed!')
    })
  }

  render () {

    let userProfile
    if (this.state.search === 'Recent') {
      userProfile = <UserProfile user={ this.state.user } />
    }

    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search}/>
      <br/>
      {userProfile}
      <RepoList repos={this.state.repos}  msg={ this.state.search } />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));