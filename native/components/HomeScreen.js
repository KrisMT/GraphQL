import React from 'react';
import {
  View,
  Button,
  Text,
} from 'react-native';

import {
  SecureStore,
} from 'expo';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  static navigationOptions = {
    title: 'Home',
    drawerLabel: 'Home',
  }

  state = {
    username: ""
  }

  _bootstrapAsync = async () => {
    const username = await SecureStore.getItemAsync('username');
    this.setState({username});
  }


  _showAbout = () => {
    this.props.navigation.navigate('About');
  }

  render() {
    return (
      <View style={{ paddingTop: 24}}>
        <Text>{this.state.username}</Text>
        <Button title="Show about page" onPress={this._showAbout} />
      </View>
    );
  }
}

export default HomeScreen;
