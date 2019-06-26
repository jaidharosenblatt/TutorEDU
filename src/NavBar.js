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
          console.log(resB.data.image)
          // const photo = "https://tutoredu.herokuapp.com/api/" +
          //   resB.data.image.substring(31,resB.data.image.length)
          // console.log(photo)

          this.setState({
            user: resA.data,
            photo: resB.data.image
          })
        }
      )
      .catch((err)=>{
        console.log(err.message)
        this.setState({isLoggedIn:false})
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
                  <a href="/edit-profile"><img className="navbar-profpic" src={ this.state.user != null ? this.state.photo : null } alt="Profile"/>
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
