import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import gql from "graphql-tag";

import {
  SecureStore,
} from 'expo';

import RootRoute from './routes';

const authLink = new ApolloLink((operation, forward) => {
  const token = SecureStore.getItemAsync('userToken') || null;
  console.log(`token: ${token}`);
  operation.setContext(({ headers = {} }) => (
    headers: {
        ...headers,
        authorization: token,
    }));

  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError && networkError.statusCode === 401) SecureStore.deleteItemAsync('userToken');
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    authLink,
    new HttpLink({
      uri: 'http://10.240.48.27:4000/graphql',
      credentials: 'same-origin'
    }),
  ]),
  cache: new InMemoryCache()
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client} >
        <RootRoute />
      </ApolloProvider>
    );
  }
}
