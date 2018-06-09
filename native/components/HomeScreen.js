import React from 'react';
import {
  View,
  Button,
} from 'react-native';

import {
  SecureStore,
} from 'expo';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    drawerLabel: 'Home',
  }

  _showAbout = () => {
    this.props.navigation.navigate('About');
  }

  render() {
    return (
      <View>
        <Button title="Show about page" onPress={this._showAbout} />
      </View>
    );
  }
}

export default HomeScreen;
