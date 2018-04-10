import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

import {RaisedButton, Paper} from 'material-ui';

import loginStyles from './Login.scss';

import {extendObservable, observable} from "mobx";
import {observer, inject} from "mobx-react";

import ApiService from './api';
import {USER_QUERIES_SCHEMA} from './constants';

const styles = {
  loginWrapper: {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: '#ccc'
  },
  loginContainer: {
    padding: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '640px'
  },
  loginItem: {
    flexBasis: '100%',
    marginTop: '10px'
  },
  inputStyle: {
    textAlign: 'center'
  },
  hintStyle: {
    textAlign: 'center',
    width: '100%'
  }
}

@inject('userProvider')
@observer
class Login extends Component {
  @observable name = '';
  @observable pass = '';
  @observable thinking = false;

  updateValue = e => this[e.target.name] = e.target.value;

  submit = e => {
    e.preventDefault();

    const self = this;
    const {name, pass} = this;

    const {
      history,
      userProvider: {
        setUserData
      }
    } = this.props,
    {
      LOGIN
    } = USER_QUERIES_SCHEMA;

    this.thinking = true;

    ApiService.req(
      {
        REQUEST: LOGIN,
        data: {
          name,
          pass
        }
      }
    ).then(res => {
      const {
        token,
        info
      } = res;

      localStorage.setItem('token', token);
      localStorage.setItem('info', JSON.stringify(info));

      setUserData({
        logged: true,
        token,
        info
      });

      this.thinking = false;
    }).catch(err => this.thinking = false);
  }

  render() {
    const {
      name,
      pass,
      thinking,
      submit
    } = this;

    return (
      <div className={loginStyles.cookie} style={styles.loginWrapper}>
        <form onSubmit={submit} noValidate>
          <Paper style={styles.loginContainer} zDepth={4}>
            <TextField inputStyle={styles.inputStyle}
                       hintStyle={styles.hintStyle}
                       style={styles.loginItem}
                       autoComplete="off"
                       name="name"
                       onChange={this.updateValue}
                       hintText="Name"
                       value={name}
                     />

            <TextField inputStyle={styles.inputStyle}
                       hintStyle={styles.hintStyle}
                       style={styles.loginItem}
                       autoComplete="new-password"
                       type="password"
                       name="pass"
                       onChange={this.updateValue}
                       hintText="Password"
                       value={pass}
                     />

            <RaisedButton style={styles.loginItem}
                          type="submit"
                          label={thinking ? 'Please wait...' : 'Login'}
                          disabled={!name.length || !pass.length}
                          primary={true}
                        />
          </Paper>
        </form>
      </div>
    );
  }
}

export default Login;
