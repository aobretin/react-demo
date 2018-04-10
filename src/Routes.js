import React from 'react';

import {Switch, Route} from 'react-router-dom';
import Login from './Login';

const Routes = ({pages}) => {
  return (
    <Switch>
      {
        pages.map((page, idx) => {
          const Component = page.content;

          return (
            <Route exact={idx === 0} key={idx} path={`/${page.path}`} render={props => {
              return (
                  typeof page.content === 'string'
                  ?
                  <div dangerouslySetInnerHTML={{__html: page.content}}></div>
                  :
                  <Component {...page.props} {...props} />
              )
            }} />
          )
        })
      }
      <Route path="/account" component={Login} />
      <Route render={() => <h1>404</h1>} />
    </Switch>
  )
}

export default Routes;
