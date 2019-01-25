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
      search: 'Popular',
      loading: true
    }

  }

  componentDidMount() {
    this.loadRepos();
    this.setState({
      search: 'Popular',
      loading: false
    })
  }

  loadRepos() {
    $.ajax({
      url: '/repos',
      type: 'GET',
      contentType: 'text/plain'
    })
    .done((data) => {
      console.log('load repos success! ')
      console.log(data)
      this.setState({
        repos: data,
        user: data[0].userId,
        loading: false
      })
    })
    .fail(() => {
      console.log('load repos failed!')
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    this.setState({
      loading: true
    })
    //$.ajax post to '/repos'
    $.ajax({
      url: '/repos',
      type: 'POST',
      contentType: 'text/plain',
      data: term
    })
    .done((data) => {
      console.log('fecth repos success!')
      this.setState({
        repos: data,
        search: 'Recent',
        user: data[0].userId,
        loading: false
      })
    })
    .fail(() => {
      console.log('fetch repos failed!')
    })
  }

  render () {

    let userProfile, loader

    const loaderStyle = {
      height: '100px',
      width:'100px',
      display:'block',
      opacity: '0.6',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '100px'
    }

    if (this.state.loading) {
      return(<div><img style={loaderStyle} src= './loader.gif' /></div>)
    }
    if (this.state.search === 'Recent') {
      userProfile = <UserProfile user={ this.state.user } />
    }

    return (
    <div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search}/><br/>
      {userProfile}
      <RepoList repos={this.state.repos}  msg={ this.state.search } />
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));