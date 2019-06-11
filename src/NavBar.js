import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import axios from "axios";
import './styles.css';
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
      .get('/current-user/', config)
      .then(resA =>
        Promise.all([
          resA,
          axios.get('/images/'+resA.data.profile_image[0])
        ])
      )
      .then(
        ([resA,resB])=>{
          const photo = "http://localhost:8000/api" +
            resB.data.image.substring(21,resB.data.image.length)
          console.log(photo)

          this.setState({
            user: resA.data,
            photo: photo
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
                  <Navbar.Text className="navbar-appointments">
                  </Navbar.Text>
                  <a href="/edit-profile"><img className="navbar-profpic" src={ this.state.user != null ? this.state.photo : null } alt=""/>
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
