import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {

    super(props);

    this.search = this.search.bind(this);
    this.loadRepos = this.loadRepos.bind(this);

    this.state = {
      repos: []
    }

  }

  componentDidMount() {
    this.loadRepos();
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
        repos: data
      })
    })
    .fail(() => {
      console.log('load repos failed!')
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    //$.ajax post to /repos
    $.ajax({
      url: '/repos',
      type: 'POST',
      contentType: 'text/plain',
      data: term
    })
    .done((data) => {
      console.log('fecth repos success!')
      this.setState({
        repos: JSON.parse(data)
      })
    })
    .fail(() => {
      console.log('fetch repos failed!')
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search}/>
      <br/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));