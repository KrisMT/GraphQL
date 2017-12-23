import React, { Component } from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

import { ALL_LINK_QUERY } from './LinkList';

class CreateLink extends Component {
  constructor() {
    super();
    this.state = {
      description: '',
      url: '',
    };
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  _createLink = async () => {
    const { description, url } = this.state;
    await this.props.createLinkMutation({
      variables: {
        url,
        description
      },
      update: (store, { data: { createLink } }) => {
        const data = store.readQuery({ query:ALL_LINK_QUERY });
        data.allLinks.push(createLink);
        store.writeQuery({
          query: ALL_LINK_QUERY,
          data
        });
      },
    })
  }

  render() {
    return (
      <div>
        <div>
          <input
            name='description'
            value={ this.state.description }
            onChange={ this.onChange.bind(this) }
            type='text'
            placeholder='A description for the link'
          />
          <input
            name='url'
            value={ this.state.url }
            onChange={ this.onChange.bind(this) }
            type='text'
            placeholder='The URL for the link'
          />
        </div>
        <button onClick={ () => this._createLink() }>Submit</button>
      </div>
    );
  }
}

const CREATE_LINK_MUTATION = gql`
  mutation CreateLinkMutaion($url: String!, $description: String!) {
    createLink(url: $url, description: $description) {
      id
      url
      description
    }
  }
`;



export default graphql(CREATE_LINK_MUTATION, {name: 'createLinkMutation' })(CreateLink);
