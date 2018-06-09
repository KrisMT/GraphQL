import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import {
  BarCodeScanner,
  Permissions,
} from 'expo';

class CheckStoreScreen extends React.Component {
  static navigationOptions = {
    title: 'Check Store',
    drawerLabel: "Check Store",
  }

  state = {
    hasCameraPermission: null,
  }

  async componentWillMount() {
    const { state } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: state === 'granted'});
  }

  _handleBarCodeRead = ({ type, data}) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  }

  render() {
    const { hasCameraPermission } = this.state;
    if( hasCameraPermission === null) {
      return <Text>Requesting for cameara permission</Text>
    } else if( hasCameraPermission === false ) {
      return <Text>Not access to camera</Text>
    } else {
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={styleSheet.absoluteFill}
          />
        </View>
      );
    }
  }
}

export default CheckStoreScreen;
