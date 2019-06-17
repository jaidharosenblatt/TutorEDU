import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import './styles.css';

class NavBar extends Component {
  render() {
    return  (
        <div className="navbar">
          <Navbar className="bg-light justify-content-between" expand="lg" fixed="top">
            <Navbar.Brand href="/">TutorEDU</Navbar.Brand>
          </Navbar>
        </div>
      )
    }
  }

export default NavBar;
