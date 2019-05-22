import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import axios from "axios";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: localStorage.getItem('token') ? true : false,
      user: null
    };
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
      .get('http://127.0.0.1:8000/api/current-user/', config)
      .then(res => {
        this.setState({
          user: res.data,
        })
        console.log(res);
      })
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    return  (
        <div className="navbar">
          <Navbar className="bg-light justify-content-between" expand="lg" fixed="top">
            <Navbar.Brand href="/">TutorEDU</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              {isLoggedIn ? (
                <div>
                  <Navbar.Text className="navbar-appointments">
                    <a href="/appointments">Appointments</a>
                  </Navbar.Text>
                  <a href="/signin"><img className="navbar-profpic" src={ this.state.user != null ? this.state.user.profile_image : null } alt=""/>
                  </a>
                </div>
              ) : (
                <Navbar.Text>
                  <a href="/signin">Sign up/Sign in</a>
                </Navbar.Text>
              )}
            </Navbar.Collapse>
          </Navbar>
        </div>
      )
    }
  }

export default NavBar;
