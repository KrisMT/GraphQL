import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class App extends Component {
  render() {
    const allLinks = this.props.data.allLinks;
    if( this.props.data && this.props.data.allLinks ){
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <ul>
            { allLinks.map( data => ( <li key={data.id}>url:{data.url} ,description:{data.description} </li> )) }
          </ul>
        </div>
      );
    }
    return <div>Loading....</div>
  }
}

export default graphql(gql`
  query allLinksQuery {
    allLinks {
      id
      url
      description
    }
  }
`)(App);
