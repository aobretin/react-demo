import React, { Component } from 'react';

import './App.scss';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    color: '#fff',
    minHeight: '500px'
  },
  box1: {
    display: 'flex',
    background: 'red',
    flexBasis: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  box2: {
    display: 'flex',
    background: 'blue',
    flexBasis: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  box3: {
    display: 'flex',
    background: 'green',
    flexBasis: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

class Homepage extends Component {
  constructor() {
    super();

    this.state = {

    }
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.box1}>Some content</div>
        <div style={styles.box2}>Some other content</div>
        <div style={styles.box3}>Some other other content</div>
      </div>
    );
  }
}

export default Homepage;
