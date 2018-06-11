import React from 'react';
import {
  View,
  StatusBar,
} from 'react-native';

import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import {
  SecureStore,
} from 'expo';

class SignOutScreen extends React.Component {
  constructor(props) {
    super(props);
    this._signOutAsync();
  }

  _signOutAsync = async () => {
    SecureStore.deleteItemAsync('userToken');
    this.props.navigation.navigate('Auth');
  }

  render() {
    return (
      <View>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default SignOutScreen;
