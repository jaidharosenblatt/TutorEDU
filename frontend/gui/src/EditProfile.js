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

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      id : 0,
      name : "",
      university : "",
      bio : "",
      availabilities : "",
      isNewData : false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  componentDidMount() {
    var config = {
      headers: {"Authorization": `Token ${localStorage.getItem('token')}`}
    };
    axios
      .get('http://127.0.0.1:8000/api/current-user/', config)
      .then(res => {
        this.setState({
          user: res.data,
        })
      })
  }

  handleChange(event){
    const {name, value, type, checked} = event.target
    type === "checkbox" ? this.setState({[name]: checked, isNewData:true  }) : this.setState({ [name]: value, isNewData:true })
    console.log(this.state)
    // let user = Object.assign({}, this.state.user)
    // user.name = this.state.name
    // this.setState({user})
  }

  handleUpdate(){
    const UserID = this.state.user.id
    axios
        .put("http://127.0.0.1:8000/api/users/" + UserID,
        {
          username: this.state.user.username
        })
        .then(res=>{console.log(res);})
  }

  handleLogout() {
    localStorage.removeItem('token');
    this.setState({ isLoggedIn: false });
  }
  render() {
    return (

      <div className="signin">

        <div className="signin-left">
          <img className="signin-background" src={background} alt="Duke University campus"/>
        </div>
        <div className="signin-right">
          <h2 className="signin-title">Edit Profile</h2>
          <p className="signin-input">Full name</p>
          <input className="signin-input-box"
            type="text"
            value =  {this.state.name}
            name = "name"
            onChange = {this.handleChange}
            placeholder="e.g. Johnny Appleseed...">
          </input>

          <p className="signin-input">Year</p>
          <select
            className="signin-input-box"
            name = "year"
            onChange = {this.handleChange}
            value = {this.state.year}>
              <option value = "freshman">Freshman</option>
              <option value = "sophomore">Sophomore</option>
              <option value = "junior">Junior</option>
              <option value = "senior">Senior</option>
              <option value = "graduate">Graduate</option>
          </select>
          <p className="signin-input">University</p>
          <input className="signin-input-box"
            type="text"
            value = {this.state.university}
            name = "university"
            onChange = {this.handleChange}
            placeholder="e.g. Duke University...">
          </input>
          <p className="signin-input">Bio</p>
          <input className="signin-input-box"
            type="text"
            value = {this.state.bio}
            name = "bio"
            onChange = {this.handleChange}
            placeholder="Tell us about yourself">
          </input>
          <p className="signin-input">Availabilities</p>
          <input className="signin-input-box"
            type="text"
            value = {this.state.availabilities}
            name = "availabilities"
            onChange = {this.handleChange}
            placeholder="e.g. Friday 10am-2pm…">
          </input>
          <div>
            <label className="signup-tutor-label">

            </label>
          </div>
          <div>
            <Link to={{ pathname: "/" }}>
              <SecondaryButton onClick={() => {this.handleUpdate()}}>Update Profile</SecondaryButton>
            </Link >
            <Link to={{ pathname: "/signin/" }}>
              <PrimaryButton onClick={() => {this.handleLogout()}}>Log Out</PrimaryButton>
            </Link >
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(EditProfile);
