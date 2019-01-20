import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {

    this.search = this.search.bind(this);

    super(props);
    this.state = {
      repos: []
    }

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
        repos: data
      })
    })
    .fail(() => {
      console.log('fetch repos failed!')
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));