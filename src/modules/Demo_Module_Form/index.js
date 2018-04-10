import React, { Component } from 'react';

import Controller from './Controller';
import Template from './Template';
import styles from './styles.scss';

class Index extends Component {
  render() {
    return <Template {...this.props} styles={styles} />
  }
}

export default Controller(Index);
