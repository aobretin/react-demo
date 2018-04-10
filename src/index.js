import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'mobx-react';
import registerServiceWorker from './registerServiceWorker';

import GlobalStore from './store';

import { BrowserRouter } from 'react-router-dom';

import * as UserProvider from './UserProvider';

ReactDOM.render(
  <BrowserRouter>
    <Provider
      userProvider={UserProvider}
      globalStore={GlobalStore}
    >
      <App />
    </Provider>
  </BrowserRouter>,
document.getElementById('root'));
registerServiceWorker();
