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

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isTutor: false,
      isLoggedIn: false,
      hasError: false,
    };

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleCheckboxChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      isTutor: value
    })
  }

  handleSignup() {

    const newUser = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
      is_tutor: false,
    }
    console.log(newUser);
    axios
      .post(" http://127.0.0.1:8000/api/register/",newUser)
      .then(resA =>
        Promise.all([
          resA,
          axios.post('http://127.0.0.1:8000/api/images/')
        ])
      )
      .then(
        ([resA,resB])=>{
          console.log(resA)
          localStorage.removeItem('token');
          localStorage.setItem('token', resA.data.token);

          let { history } = this.props;
          history.push({
           pathname: '/',
          });
        }
      )
      .catch((err)=>{
        console.log(err.message)
        this.setState({hasError:true})
      })
  }

  render() {
    return (
      <div className="signin">
        <div className="signin-left">
          <img className="signin-background" src={background} alt="Duke University campus"/>
        </div>
        <div className="signin-right">
          <h2 className="signin-title">Sign up</h2>
          <p className="signin-input">Full name</p>
          <input className="signin-input-box" id="name" type="text" placeholder="e.g. Johnny Appleseed..."></input>
          <p className="signin-input">Email</p>
          <input className="signin-input-box" id="email" type="text" placeholder="e.g. ja123@duke.edu"></input>
          <p className="signin-input">Username</p>
          <input className="signin-input-box" id="username" type="text" placeholder="e.g. johnapple"></input>
          <p className="signin-input">Password</p>
          <input className="signin-input-box" id="password" type="password" placeholder="(8 characters minimum)"></input>
          <div>
            <label className="signup-tutor-label">
            </label>

          </div>
          {this.state.hasError ? <p  style={{color:"#d13e50"}}>Error creating profile</p> : null}
          <div>
            <Link to={{ pathname: "/signin/" }}>
              <SecondaryButton>Sign In</SecondaryButton>
            </Link>
            {this.state.isTutor ? (
              <Link to={{
                pathname: '/signup-tutor',
                state: {
                  name: document.getElementById('name') === null ? "" : document.getElementById('name').value,
                  email: document.getElementById('email') === null ? "" : document.getElementById('email').value,
                  username: document.getElementById('username') === null ? "" : document.getElementById('username').value,
                  password: document.getElementById('password') === null ? "" : document.getElementById('password').value,
                }
              }}><PrimaryButton>Continue</PrimaryButton>
              </Link>
            ) : (
              <PrimaryButton onClick={() => {this.handleSignup()}}>Create Account</PrimaryButton>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SignUp);
