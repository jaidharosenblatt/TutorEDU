import React, { Component } from 'react';
import './styles.css';
import styled from 'styled-components';
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import background from './images/duke.png'

const PrimaryButton = styled.button`
  height: 44px;
  width: 160px;
  background-color: #1C3A9F;
  border-radius: 4px;
  font-family: Avenir-Heavy;
  font-size: 12px;
  color: white;
  letter-spacing: 0;
  text-align: center;
  justifyContent: center;
  alignItems: center;
  margin-top: 36px;

  :hover {
    color: white;
    border: 0px;
    background-color: #1C3A9F;
  }
`;

const SecondaryButton = styled.button`
  height: 44px;
  width: 160px;
  border: 2px solid #D9E2FF;
  border-radius: 4px;
  font-family: Avenir-Heavy;
  font-size: 12px;
  color: #1C3A9F;
  letter-spacing: 0;
  text-align: center;
  justifyContent: center;
  alignItems: center;
  margin-top: 12px;
  margin-right: 12px;

  :hover {
    color: white;
    border: 0px;
    background-color: #1C3A9F;
  }
`;

class SignUpTutor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      name: "",
      email: "",
      username: "",
      password: "",
    };
  }

  componentDidMount() {

    const { name, email, username, password } = this.props.location.state

    this.setState({
      name: name,
      email: email,
      username: username,
      password: password,
    })
  }

  handleSignup() {

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      is_tutor: true,
      bio: document.getElementById('bio').value,
      hourly_rate: document.getElementById('hourlyRate').value,
      availabilities: document.getElementById('availabilities').value
    }

    console.log(newUser);

    axios.post('http://127.0.0.1:8000/api/users/', newUser)
      .then((response) => {
        console.log(response);
        localStorage.removeItem('token');
        localStorage.setItem('token', response.data.token);

        let { history } = this.props;
        history.push({
         pathname: '/',
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="signin">
        <div className="signin-left">
          <img className="signin-background" src={background} alt="Duke University campus"/>
        </div>
        <div className="signin-right">
          <h2 className="signin-title">Complete your tutor profile</h2>
          <p className="signin-input">Bio</p>
          <textarea className="bio-input-box" id="bio" type="text" placeholder="Tell us about yourself…"></textarea>
          <p className="signin-input">Courses</p>
          <input className="signin-input-box" id="courses" type="text" placeholder="CS290, I&E342, etc. (Comma separated)"></input>
          <p className="signin-input">Hourly rate</p>
          <input className="hourlyRate-input-box" id="hourlyRate" type="text" placeholder="$"></input>
          <p className="signin-input">Availabilities</p>
          <input className="signin-input-box" id="availabilities" type="text" placeholder="Friday 10am-2pm…"></input>
          <div>
            <Link to={{ pathname: "/signup/" }}>
              <SecondaryButton>Back</SecondaryButton>
            </Link>
            <PrimaryButton onClick={() => {this.handleSignup()}}>Create Account</PrimaryButton>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SignUpTutor);
