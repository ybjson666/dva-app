import React from 'react';
import { Router, Route, Switch} from 'dva/router';
import Login from '../pages/login'
import Home from '../pages/home'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route  component={Home}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
