import { decorate } from "mobx";

import STATE_PROPS from './state';
import STATE_ACTIONS from './actions';

import {buildObservableObject} from '../../../helpers';

class State {
  constructor(STORE_NAME) {
    this.STORE_NAME = STORE_NAME;

    Object.keys(STATE_PROPS).forEach(key => this[key] = STATE_PROPS[key]);
    Object.keys(STATE_ACTIONS).forEach(key => this[key] = STATE_ACTIONS[key].bind(this));
  }
}

export default decorate(State, buildObservableObject(STATE_PROPS))
