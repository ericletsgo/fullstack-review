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
      success: (data) => {
        this.setState({
          repos: data
        });
      },
      error: (data) => {
        console.log('init error')
      }
    });
  }

  search (term) {
    $.ajax({
      url: 'http://localhost:1128/Repos',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        term: term
      }),
      success: (data) => {
        console.log('success');
        this.init();
      },
      error: () => {
        console.log('post failed');
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <h4> Repo List Component </h4>
      <p>There are {this.state.repos.length} repos.</p>
      {this.state.repos.map(repo => <RepoList repoUrl={repo.repositoryUrl} repoTitle={repo.repo_name}/>)}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
