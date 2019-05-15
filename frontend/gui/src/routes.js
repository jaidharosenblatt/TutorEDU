import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from "axios";
import { Route } from "react-router-dom";
import Collection from './collection';
import TutorProfile from './TutorProfile';
import Appointments from './Appointments';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SignUpTutor from './SignUpTutor';

// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// axios.defaults.xsrfCookieName = "csrftoken";

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={Collection} />
    <Route path="/tutors/:userID" component={TutorProfile} />
    <Route path="/appointments" component={Appointments} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/signup-tutor" component={SignUpTutor} />
  </div>
);

export default BaseRouter;
