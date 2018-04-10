import React from 'react';
import logo from './logo.svg';

import { Link } from 'react-router-dom';

const Header = ({styles, pages, logoutUser}) => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <ul style={styles.nav}>
        {
          pages.map((page, idx) => {
            return (
              page.name && (
                <li key={idx}>
                  <Link style={styles.navItem} to={`/${page.path}`}>{page.name}</Link>
                </li>
              )
            )
          })
        }
        <li>
          |
        </li>
        <li>
          <a href="javascript:;" style={styles.navItem} onClick={logoutUser}>Logout</a>
        </li>

      </ul>
    </header>
  )
}

export default Header;
