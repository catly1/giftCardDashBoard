import React from 'react';
// import './App.css';
import Dashboard from './components/dashboard';
// import { AuthRoute } from './util/route_util';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import SessionForm from './components/session_form';


const App = () => (
  <BrowserRouter>
  <Switch>
      {/* <AuthRoute exact path="/signup" component={SignUp} /> */}
      {/* <AuthRoute exact path="/login" component={Login} /> */}
      
      <Route exact path="/signup" component={() => new SessionForm("signup")} />
      <Route exact path="/login" component={() => new SessionForm("login")} />
      <Route path="/" render={() => <Redirect to="/login" />} />
    </Switch>
  </BrowserRouter>
);

export default App;