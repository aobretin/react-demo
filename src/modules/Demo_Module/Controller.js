import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from "mobx-react";
import moment from 'moment';

import Store from './store';
import Service from './service';

import {buildModuleAliases} from '../../helpers';

const {
  MODULE_NAME,
  parties,
  setParties,
} = buildModuleAliases(
  'Demo_Module',
  'parties',
  'setParties'
);

const Controller = Index => {
  return @inject('globalStore') @observer class extends Component {
    static propTypes = {}
    static defaultProps = {}

    constructor(props) {
      super(props);

      this.store = new Store(MODULE_NAME);
      this.service = new Service();

      if (!props.globalStore.stores[this.store.STORE_NAME]) {
        props.globalStore.registerStore(this.store.STORE_NAME, this.store);
      }
    }

    componentDidMount() {
      this.service.fetchParties().then(res => this.store.setParties(res.parties));
    }

    componentWillUnmount() {
      this.props.globalStore.destroyStore(this.store.STORE_NAME);
    }

    filters = {
      convertDateToUserFriendly(v) {
        return moment(v).format('DD/MM/YYYY');
      }
    }

    render() {
      return (
        <Index
            filters={this.filters}
            {...this.store}
            {...this.props}
        />
      )
    }
  }
}

export default Controller;
