import React, { Component } from 'react';
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: true,
      email: '',
      password: '',
      name: '',
    };
  }

  _confirm = async () => {
    const { email, password } = this.state;
    const data = { email: email, password: password };
    console.log(data);
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  _saveUserData = (id, token) => {
    localStorage.setItem(GC_USER_ID, id);
    localStorage.setItem(GC_AUTH_TOKEN, token);
  }

  render() {
    return (
      <div>
        <label>Email: </label>
        <input
          name='email'
          type='text'
          placeholder='Please insert your email'
          onChange={this.onChange.bind(this)}
        />
        <label>Password: </label>
        <input
          name='password'
          type='password'
          placeholder='Please enter your password'
          onChange={this.onChange.bind(this)}
        />
        {
          ' '
        }
        <div>
          <button onClick={this._confirm.bind(this)} >Submit</button>
        </div>
      </div>
    );
  }
}

export default Login;
