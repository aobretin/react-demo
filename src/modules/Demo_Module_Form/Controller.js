import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from "mobx-react";
import moment from 'moment';

import Store from './store';
import Service from './service';

import {buildModuleAliases} from '../../helpers';

const {
  MODULE_NAME,
  party
} = buildModuleAliases(
  'Demo_Module_Form',
  'party'
);

const Controller = Index => {
  return @inject('globalStore') @observer class extends Component {
    static propTypes = {
      id: PropTypes.string
    }

    static defaultProps = {
      id: null
    }

    constructor(props) {
      super(props);

      this.store = new Store(MODULE_NAME);
      this.service = new Service();

      if (!props.globalStore.stores[this.store.STORE_NAME]) {
        props.globalStore.registerStore(this.store.STORE_NAME, this.store);
      }
    }

    componentDidMount() {
      const {
        service: {
          fetchParty
        },
        store: {
          setParty
        }
      } = this;

      if (this.props.match && this.props.match.params.id !== null) {
        fetchParty(this.props.match.params.id).then(res => {
          setParty(res.party);
        })
      }
    }

    filters = {

    }

    cancelCreateParty = () => {
      if (this.props.match && this.props.match.params.id !== null) {
        this.props.history.push('/party-demo');
      } else {
        this.props.globalStore.dispatch('Demo_Module/toggleCreateParty', {createParty: false});
      }
    }

    submit = model => {
      const {
        editParty
      } = this.service;

      const party = this.props.globalStore.getStoreKey('Demo_Module_Form/party');

      editParty(party).then(res => {
        if (party.id) {
          this.props.history.push('/party-demo');
        } else {
          this.props.globalStore.dispatch('Demo_Module/setParties', {parties: res.parties});
          this.props.globalStore.dispatch('Demo_Module/toggleCreateParty', {createParty: false});
        }
      });
    }

    render() {
      return (
        <Index
          submit={this.submit}
          cancelCreateParty={this.cancelCreateParty}
          filters={this.filters}
          {...this.store}
          {...this.props}
        />
      )
    }
  }
}

export default Controller;
