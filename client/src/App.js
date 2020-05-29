import React from 'react';
// import './App.css';
import Dashboard from './components/dashboard';
import { AuthRoute, ProtectedRoute } from './util/route_util';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import SessionForm from './components/session_form';
import { auth } from './util/session_api';
import { logout } from './util/session_api'


const App = (props) => {
  const [user, setUser] = React.useState({name: ""});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);


  React.useEffect(() => {
    auth().then(res => {
      if (!res.name) {
        setUser(res.user);
        setIsLoggedIn(true);
      }
    })
  },[])

  const handleLogout = () => {
    logout().then(res => {
      setUser({})
      window.location.reload()
    });
   ;
  }

  const renderLogout = () => {
    if (isLoggedIn) return <button onClick={handleLogout}>Logout</button>
  }

  return(
  <BrowserRouter>
  {renderLogout()}
  <Switch>
      <AuthRoute exact path="/signup" component={() => new SessionForm("signup")} loggedIn={isLoggedIn}/>
      <AuthRoute exact path="/login" component={() => new SessionForm("login")} loggedIn={isLoggedIn}/>
      <ProtectedRoute exact path="/dashboard" component={() => new Dashboard(user)} loggedIn={isLoggedIn}/>
      <Route path="/" render={() => <Redirect to="/dashboard" />} />
  </Switch>
  </BrowserRouter>
  )
};

export default App;