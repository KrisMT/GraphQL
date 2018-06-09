import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';

import { SecureStore } from 'expo';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const userToken = await SecureStore.getItemAsync('userToken');

    this.props.navigation.navigate(userToken? 'App': 'Auth');
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthLoadingScreen;
