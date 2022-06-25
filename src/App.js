import axios from "axios";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import PremiumContent from "./PremiumContent";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import React, { useState, useEffect } from "react";
import {getUser, getToken, setUserSession, resetUserSession} from "./service/AuthService";
import axiosInstance from "./index.js";

const verifyTokenAPIUrl = "https://954agpq9fl.execute-api.us-east-1.amazonaws.com/dev/verify";

function App() {

  const  [isAuthenicating, setAuthenicating] = useState(true);
  useEffect(() => {
    const token = getToken();
    if  (token === 'undefined' || token === undefined || token === null || !token){
      return;
    }

    const requestConfig ={
      headers: {
          'x-api-key': '7JKQRCuKLo5xs1hVmt8JP5ipHJXlRy5f6zlju0V4'//process.env.REACT_APP_API_KEY
      }
     }
     const requestBody ={
      username : getUser(),
      token : token
     }
     axios.post(verifyTokenAPIUrl, requestBody, requestConfig).then(response =>
     //axiosInstance.post('/verify', requestBody, requestConfig).then(response =>
      {
          setUserSession(response.data.user, response.data.token);
          setAuthenicating(false);

      }).catch(() => {
        resetUserSession();
        setAuthenicating(false);
      })

  }, []);

  const token = getToken();
  if(isAuthenicating && token) {
    return <div className="content">
      Hold on we are authenticating...
    </div>
  }
 
  return (
    <div className="App">
      <BrowserRouter>
      <div className="header">
        <NavLink exact activeClassName="active" to="/">Home</NavLink>
        <NavLink activeClassName="active" to="/register">Register</NavLink>
        <NavLink activeClassName="active" to="/login">Login</NavLink>
        <NavLink activeClassName="active" to="/premium-content">Website</NavLink>
      </div>
      <div className="content">
        <Switch>
          <Route exact path="/" component={Home}/>
          <PublicRoute path="/register" component={Register}/>
          <PublicRoute path="/login" component={Login}/>
          <PrivateRoute path="/premium-content" component={PremiumContent}/>
        </Switch>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
