import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import NavBar from './NavBar';
import App from './App';
import TutorProfile from './Tutors/TutorProfile';
import Appointments from './Appointments/Appointments';
import SignIn from './UserProfile/SignIn';
import SignUp from './UserProfile/SignUp';
import EditProfile from "./UserProfile/EditProfile"
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.baseURL = 'http://localhost:8000/api';
// axios.defaults.baseURL = 'https://tutoredu.herokuapp.com/';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;


const routing = (
  <div>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/tutors/:userID" component={TutorProfile} />
        <Route path="/appointments" component={Appointments} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/edit-profile" component={EditProfile} />
      </div>
    </Router>
  </div>
)


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
