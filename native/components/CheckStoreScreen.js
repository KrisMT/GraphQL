import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
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
    strButtonTitle: "SCAN Page",
    bQRPage: false,
  }

  async componentWillMount() {
    const { state } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: state === 'granted'});
  }

  _handleBarCodeRead = ({ type, data}) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  }

  _toogleQR = () => {
    const { bQRPage} = this.state;
    const strButtonTitle = bQRPage? "SCAN Page" : "SETTING PAGE";
    this.setState({strButtonTitle});
    this.setState({bQRPage: !bQRPage});
  }

  render() {
    const { hasCameraPermission, bQRPage, strButtonTitle } = this.state;
    if( hasCameraPermission === null) {
      return <Text>Requesting for cameara permission</Text>
        //} else if( hasCameraPermission === false ) {
        //return <Text>Not access to camera</Text>
    } else if(bQRPage === false) {
      return (
        <View style={styles.container}>
          <Button title={strButtonTitle} onPress={this._toogleQR} />
          <View>
            <Text>Setting anythings</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Button title={strButtonTitle} onPress={this._toogleQR} />
          <View style={{flex: 1}}>
            <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={StyleSheet.absoluteFill}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
});

export default CheckStoreScreen;
