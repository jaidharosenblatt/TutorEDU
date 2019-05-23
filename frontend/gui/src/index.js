import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NavBar from './NavBar';
import Collection from './collection';
import TutorProfile from './TutorProfile';
import Appointments from './Appointments';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SignUpTutor from './SignUpTutor';
import EditProfile from "./EditProfile"
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const routing = (
  <div>
    <div className="navbar">
      <NavBar/>
    </div>
    <Router>
      <div>
        <Route exact path="/" component={Collection} />
        <Route path="/tutors/:userID" component={TutorProfile} />
        <Route path="/appointments" component={Appointments} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signup-tutor" component={SignUpTutor} />
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
