import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import RootRoute from './routes';

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: 'http://10.91.34.133:4000/graphql',
      credentials: 'same-origin'
    })
  ]),
  cache: new InMemoryCache()
});

const ExchangeRates = () => (
  <Query
    query={gql`
      {
        allLinks
        {
          url
          description
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <Text>Loading...</Text>;
      if (error) return <Text>Error :(</Text>;

      return data.allLinks.map(({ url, description }) => (
        <Text key={url}>
          {`${url}: ${description}`}
        </Text>
      ));
    }}
  </Query>
);

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client} >
        <RootRoute />
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  route: {
    color: '#701010',
    fontSize: 40
  },
  routeLink: {
    color: '#0000FF'
  },
  routeContainer: {
    flex: 1,
    justifyContent: 'center'
  },
});
