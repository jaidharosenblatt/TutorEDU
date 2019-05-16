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

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: localStorage.getItem('token') ? true : false,
      username: '',
      user: null,
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
      headers: {'Authorization': `JWT ${localStorage.getItem('token')}`}
    };

    axios
      .get('http://127.0.0.1:8000/api/current-user/', config)
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

    axios.post('http://127.0.0.1:8000/api/token-auth/', credentials)
      .then((response) => {
        console.log(response);
        if (response.data.token !== undefined) {
          localStorage.setItem('token', response.data.token);
          this.setState({
              isLoggedIn: true,
            });
            this.refreshToken()
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  refreshToken() {
    axios.post('http://127.0.0.1:8000/api/token-auth-refresh/', { token: localStorage.getItem('token') })
      .then((response) => {
        console.log(response);
        if (response.data.token !== undefined) {
          localStorage.setItem('token', response.data.token);
          this.setState({
              isLoggedIn: true,
            });

            window.location.reload()
            let { history } = this.props;
            history.push({
             pathname: '/',
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleLogout() {
    localStorage.removeItem('token');
    this.setState({ isLoggedIn: false });
    window.location.reload();
  }

  render() {

    const signInView =
      <div className="signin-right">
        <h2 className="signin-title">Sign in</h2>
        <p className="signin-input">Username</p>
        <input className="signin-input-box" id="username" type="text" placeholder="">
        </input>
        <p className="signin-input">Password</p>
        <input className="signin-input-box" id="password" type="password" placeholder="">
        </input>
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
