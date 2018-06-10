import React from 'react';
import {
  View,
  Button,
  Text,
  TextInput,
} from 'react-native';

import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const SIGNIN_MUTATION = gql`
  mutation signinUser($email: String!, $password: String!)
  {
    signinUser(authProvider: {
      email: $email,
      password: $password
    }){
      token
      user{
        name
      }
    }
  }
`;

import {
  SecureStore,
} from 'expo';

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  }

  state = {
    email: "",
    password: ""
  }

  _signInAsync = async (token, username) => {
    await SecureStore.setItemAsync('userTiken', token);
    await SecureStore.setItemAsync('username', username);
    this.props.navigation.navigate('App');
  }

  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        update={(cache, { data: { signinUser } }) => {
          this._signInAsync(signinUser.token, signinUser.user.name);
        }}
      >
      {(signinUser) => (
        <View>
          <TextInput
            style={{height: 40}}
            placeholder="Type email for sign in"
            onChangeText={(email) => this.setState({email})}
          />
          <TextInput
            style={{height: 40}}
            placeholder="Type password for sign in"
            onChangeText={(password) => this.setState({password})}
          />
          <Button
            title="Sign in!"
            onPress={() =>
              {
                signinUser({variables: { email: this.state.email, password: this.state.password}});
              }}
          />
        </View>
      )}
      </Mutation>
    );
  }
}

export default SignInScreen;
