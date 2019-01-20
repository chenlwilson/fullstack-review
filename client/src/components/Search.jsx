import React from 'react';
import _ from 'lodash';

class Search extends React.Component {
  constructor(props) {

    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = {
      term: ''
    }
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  render() {

    let debounceSearch = _.debounce(() => { this.props.onSearch(this.state.term) }, 500);

    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={this.state.terms} onChange={this.onChange}/>
      <button onClick={debounceSearch}> Add Repos </button>
    </div>)
  }
}

export default Search;