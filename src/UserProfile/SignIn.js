import React, { Component } from 'react';
import './styles.css';
import styled from 'styled-components';
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import background from './duke.png'

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
  margin-right: 12px;

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

  :hover {
    color: white;
    border: 0px;
    background-color: #1C3A9F;
  }
`;

class SignIn extends Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: localStorage.getItem('token') ? true : false,
      username: '',
      user: null,
      hasError: false,
      redirect: false
    };

    this.handleLogin = this.handleLogin.bind(this);

  }

  componentDidMount() {
    if (this.state.isLoggedIn) {
      this.getCurrentUser()
    }
  }

  getCurrentUser() {
    var config = {
      headers: {"Authorization": `Token ${localStorage.getItem('token')}`}
    };

    axios
      .get('/api/current-user/', config)
      .then(res => {
        console.log(res);
        this.setState({
          user: res.data,
        })
      })
  }

  handleLogin() {

    const credentials = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    }

    axios.post('/api/login/', credentials)
      .then((response) => {
        console.log(response);
        if (response.data.token !== undefined) {
          localStorage.setItem('token', response.data.token);
          this.setState({
              isLoggedIn: true,
              redirect: true
            });
        }
      })
      .catch((error) => {
        this.setState({hasError:true})
        console.log(error);

      });

  }

  handleLogout() {
    localStorage.removeItem('token');
    this.setState({ isLoggedIn: false });
    window.location.reload();
  }

  render() {

    if (this.state.redirect){
      window.location.assign("/");
      // return (
      //   <Redirect push to="/" />
      // )

    }
    const signInView =
      <div className="signin-right">
        <h2 className="signin-title">Sign in</h2>
        <p className="signin-input">Username</p>
        <input className="signin-input-box" id="username" type="text" placeholder="">
        </input>
        <p className="signin-input">Password</p>
        <input className="signin-input-box" id="password" type="password" placeholder="">
        </input>
        {this.state.hasError ? <p style={{color:"#d13e50"}}>You have entered an invalid username or password</p> : null}
        <div>
          <PrimaryButton onClick={() => {this.handleLogin()}}>Sign In</PrimaryButton>
          <Link to={{ pathname: "/signup/" }}>
            <SecondaryButton>Sign Up</SecondaryButton>
          </Link>
        </div>
      </div>

    const signOutView =
      <div className="signin-right">
        <h2 className="signin-title">Hi { this.state.user !== null ? this.state.user.name : "there"}!</h2>
        <p>Are you sure you want to log out?</p>
        <div>
          <PrimaryButton onClick={() => {this.handleLogout()}}>Logout</PrimaryButton>
        </div>
      </div>

    return (
      <div className="signin">
        <div className="signin-left">
          <img className="signin-background" src={background} alt="Duke University campus"/>
        </div>
        {this.state.isLoggedIn ? signOutView : signInView}
      </div>
    )
  }
}

export default withRouter(SignIn);
