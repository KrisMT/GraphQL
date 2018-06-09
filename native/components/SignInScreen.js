import React from 'react';
import {
  View,
  Button,
} from 'react-native';

import {
  SecureStore,
} from 'expo';

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  }

  _signInAsync = async () => {
    await SecureStore.setItemAsync('userTiken', 'abc');
    this.props.navigation.navigate('App');
  }

  render() {
    return (
      <View>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }
}

export default SignInScreen;
