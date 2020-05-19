import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import Dashboard from '../containers/Dashboard';

function Routes() {
  return (
    <BrowserRouter>
    <Switch>
    <Route exact path='/' component={Login}/>
    <Route exact path='/login' component={Login}/>
    <Route exact path='/signup' component={Signup}/>
    <Route exact path='/dashboard' component={Dashboard} />
    </Switch>
    </BrowserRouter>
  );
}

export default Routes;
