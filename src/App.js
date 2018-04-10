import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {withRouter} from 'react-router-dom';

import ApiService from './api';
import {
  PAGES_QUERIES_SCHEMA,
  USER_QUERIES_SCHEMA
} from './constants';

import {observable} from "mobx";
import {observer, inject} from "mobx-react";

import styless from './App.scss';

import Header from './Header';
import Routes from './Routes';

import Login from './Login';

import RoutesCreator from './RoutesCreator';

import Demo_Module from './modules/Demo_Module';

const styles = {
  appBody: {
    padding: '20px'
  },
  loader: {
    textAlign: 'center'
  },
  nav: {
    padding: 0,
    display: 'flex',
    justifyContent: 'space-around',
    listStyle: 'none'
  },
  navItem: {
    color: '#fff'
  }
}

@withRouter
@inject('userProvider', 'globalStore')
@observer
class App extends Component {
  @observable pages = [];
  @observable loaded = false;
  @observable logged = false;

  constructor(props) {
    super(props);

    const {getUserData} = props.userProvider;

    this.logged = getUserData('logged');
  }

  logoutUser = () => {
    const {
      setUserData,
      getUserData
    } = this.props.userProvider;

    localStorage.clear();
    setUserData('logged', false);
  }

  componentDidMount() {
    const {
      getUserData,
      setUserData
    } = this.props.userProvider,
      token = localStorage.getItem('token'),
      info = localStorage.getItem('info'),
      {
        GET: GET_PAGES
      } = PAGES_QUERIES_SCHEMA,
      {
        LOGIN
      } = USER_QUERIES_SCHEMA;

      // const requests = {
      //   request_1: {
      //     REQUEST: GET_PAGES
      //   },
      //   request_2: {
      //     data: {
      //       name: 'alex',
      //       pass: '123123'
      //     },
      //     REQUEST: LOGIN
      //   }
      // }
      //
      // ApiService.q(requests).then(res => {
      //   console.log(res);
      // })

    if (token) {
      setUserData({
        logged: true,
        token: token,
        info: JSON.parse(info)
      });
    }

    ApiService.req({
      REQUEST: GET_PAGES
    }).then(res => {
      this.pages = new RoutesCreator(res).getRoutes;
      this.loaded = true;
    });
    //
    // this.props.globalStore.dispatch('Demo_Module/toggleCreateParty', {createParty: true}, () => {
    //   console.log('executed async after store method');
    // });
  }

  render() {
    const {
      pages,
      loaded,
      props: {
        userProvider: {
          getUserData
        }
      },
      logoutUser
    } = this,

    HEADER_PROPS = {
      styles,
      pages,
      logoutUser
    },

    ROUTES_PROPS = {
      pages
    },

    logged = getUserData('logged');

    return (
      <MuiThemeProvider>
        {
          !logged
          ?
          <Login />
          :
          <div className="App">
            <Header {...HEADER_PROPS} />
            <div style={styles.appBody}>
              {
                loaded
                ?
                <Routes {...ROUTES_PROPS} />
                :
                <h1 style={styles.loader}>Loading...</h1>
              }
            </div>
          </div>
        }
      </MuiThemeProvider>
    );
  }
}

export default App;
