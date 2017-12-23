import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LinkList extends Component {
  render() {
    if( this.props.allLinksQuery && this.props.allLinksQuery.loading) {
      return <div>Loading....</div>
    }

    if( this.props.allLinksQuery && this.props.allLinksQuery.error) {
      return <div> { this.props.allLinksQuery.error.message} </div>
    }

    const allLinks = this.props.allLinksQuery.allLinks;
    if( this.props.allLinksQuery && this.props.allLinksQuery.allLinks ){
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
  }
}

export const ALL_LINK_QUERY = gql`
  query {
    allLinks {
      id
      url
      description
    }
  }
`;

export default graphql(ALL_LINK_QUERY, {name: 'allLinksQuery'})(LinkList);
