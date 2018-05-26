import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  componentDidMount() {
    this.init();
  }

  init() {
    $.ajax({
      url: 'http://localhost:1128/Repos',
      method: 'GET',
      // dataType: 'application/json',
      success: (data) => {
        // let top = JSON.parse(data);
        console.log(data);
        // console.log('I got it')
      },
      error: (data) => {
        console.log('init error')
      }
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: 'http://localhost:1128/Repos',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        term: term
      }),
      success: (data) => {
        console.log('success');
      },
      error: () => {
        console.log('failed');
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
