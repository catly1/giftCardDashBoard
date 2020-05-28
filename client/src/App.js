import React from 'react';
// import './App.css';
import Dashboard from './components/dashboard';
import { AuthRoute } from './util/route_util';
import { Switch, Route } from 'react-router-dom';

const App = () => (
  <Switch>
    {/* <AuthRoute exact path="/signup" component={SignUp} /> */}
    {/* <AuthRoute exact path="/login" component={Login} /> */}
    <Route path="/" component={Dashboard} />
  </Switch>
);

export default App;