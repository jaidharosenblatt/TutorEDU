import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import axios from "axios";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: localStorage.getItem('token') ? true : false,
      user: null,
      photo: {},
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
      .then(resA =>
        Promise.all([
          resA,
          axios.get('http://127.0.0.1:8000/api/images/'+resA.data.profile_image[0])
        ])
      )
      .then(
        ([resA,resB])=>{
          console.log(resA)
          this.setState({
            user: resA.data,
            photo: resB.data
          })
        }
      )
      .catch((err)=>{
        console.log(err.message)
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
                  <a href="/edit-profile"><img className="navbar-profpic" src={ this.state.user != null ? this.state.photo.image : null } alt=""/>
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
