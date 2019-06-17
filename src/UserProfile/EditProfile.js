import React, { Component } from 'react';
import './styles.css';
import styled from 'styled-components';
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import background from './duke.png'
import Select from "react-select";
import NavBar from "./NavBar"

const PrimaryButton = styled.button`
  height: 44px;
  width: 160px;
  background-color: #1C3A9F;
  border-radius: 4px;

font-weight:700;
  font-size: 12px;
  color: white;
  letter-spacing: 0;
  text-align: center;
  justifyContent: center;
  alignItems: center;
  margin-right: 12px;
  margin-top: 10px;

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

font-weight:700;
  font-size: 12px;
  color: #1C3A9F;
  letter-spacing: 0;
  text-align: center;
  justifyContent: center;
  alignItems: center;
  margin-top: 10px;


  :hover {
    color: white;
    border: 0px;
    background-color: #1C3A9F;
  }
`;
const colourStyles = {
  control: styles => ({ ...styles,
    backgroundColor: '#F8F8F8',
    border: '1px solid #ECECEC'
  }),
  placeholder: styles => ({...styles,
    color:'#D2D2D2',
  }),
};
class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      year: {},
      redirect: false,
      is_tutor: true,
      hasError: false,
      courses: [],
      userCourses: [],
      profilePic: null,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  componentDidMount() {
    var config = {
      headers: {"Authorization": `Token ${localStorage.getItem('token')}`}
    };
    axios
      .get('/current-user/', config)
      .then(res => {
        this.setState({
          user: res.data,
        })
      })

    axios
      .get("/courses/")

      .then(res => {
        const courseData = res.data
        this.setState({courses:courseData})
      })
      .catch(err => console.log(err));
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    console.log(this.state)
    }
  handleImageChange = (e) => {
     this.setState({
       profilePic: e.target.files[0]
     })
   }
  handleImage(){
    let formData = new FormData();
    const imageID = this.state.user.profile_image[0]
    formData.append("image",this.state.profilePic);
    formData.append("user",this.state.user.id);
    formData.append("id",imageID);
    var config = {
      headers: { 'Accept': 'application/json',
     'Content-Type': 'multipart/form-data',}
    };
    // const image = this.state.profilePic

    console.log(formData)
    axios
      .put('/images/'+imageID, formData,config)
      .then(res => {
        console.log(res)
        this.setState({ appointment: res.data })
      })
      .catch(err => console.log(err));
  }
  handleUpdate(){
    if (this.state.profilePic !== null){
      this.handleImage()
    }


    console.log(this.state.userCourses)
    const coursesIDs = this.state.userCourses.map(course => {
      return(course.value)
    })

    var myCourses = coursesIDs
    if (coursesIDs.length === 1 && coursesIDs.label === "None"){
      myCourses = null
    }
    if (coursesIDs.length === 0){
      myCourses = this.state.user.courses
    }
    else{
      myCourses = coursesIDs
    }
    console.log(this.state.year.value)

    const myID =  this.state.user.id
    const updatedUser = {
        name : this.state.name,
        year : this.state.year.value,
        university : this.state.university,
        bio : this.state.bio,
        availabilities: this.state.availabilities,
        is_tutor: this.state.is_tutor,
        hourly_rate: this.state.hourly_rate,
        courses: myCourses,
        profile_image: this.state.image
    }
    console.log(updatedUser)
    axios
        .patch("/users/" + myID,updatedUser)
        .then(
          res=>{console.log(res)
            if (res.status === 200){
              this.setState({redirect:true})
            }
          }
        )
        .catch(
          err => {console.log(err)
          this.setState({hasError:true})
          })
  }
  handleLogout() {
    localStorage.removeItem('token');
    this.setState({ isLoggedIn: false });
  }

  render() {
    if (this.state.redirect){
      window.location.assign("/");
    }
    const options = this.state.courses.map(course => {
      const newCourse = {value: course.id,label:course.name}
      return(newCourse)
    })
    let years = [
      {
        label: 'Freshman',
        value: 'freshman'
      },
      {
        label: 'Sophomore',
        value: 'sophomore'
      },
      {
        label: 'Junior',
        value: 'junior'
      },
      {
        label: 'Senior',
        value: 'senior'
      },
      {
        label: 'Graduate',
        value: 'graduate'
      },
    ]
    return (

      <div className="editprofile">
        <NavBar />
        <div className="signin-left">
          <img className="signin-background" src={background} alt="Duke University campus"/>
        </div>
        <div className="editprofile-right ">
          <h2 className="signin-title">Edit Profile</h2>
          <p className="signin-input">Full name</p>
          <input className="signin-input-box"
            type="text"
            // value =  {this.state.name}
            name = "name"
            defaultValue={this.state.user.name}
            onChange = {this.handleChange}
            placeholder="e.g. Johnny Appleseed...">
          </input>
          <p className="signin-input">Year</p>
          <Select
            className = "course-dropdown"
            styles = {colourStyles}
            options = {years}
            onChange = {year => this.setState({year})}
          />
          <p className="signin-input">University</p>
          <input className="signin-input-box"
            type="text"
            defaultValue = {this.state.user.university}
            name = "university"
            onChange = {this.handleChange}
            placeholder="e.g. Duke University...">
          </input>
          <p className="signin-input">Bio</p>
          <input className="signin-input-box"
            type="text"
            defaultValue = {this.state.user.bio}
            name = "bio"
            onChange = {this.handleChange}
            placeholder="Tell us about yourself">
          </input>


          <p className="signin-input">Availabilities</p>
          <input className="signin-input-box"
            type="text"
            defaultValue = {this.state.user.availabilities}
            name = "availabilities"
            onChange = {this.handleChange}
            placeholder="e.g. Friday 10am-2pm…">
          </input>
          <p className="signin-input"> Rate ($/Hour)</p>
          <input
            className="hourlyRate-input-box"
            pattern="[0-9]*"
            defaultValue = {this.state.user.hourly_rate}
            name = "hourly_rate"
            onChange = {this.handleChange}
            placeholder="$">
          </input>
          <p className="signin-input">Courses taken</p>
          <div>
          <Select
            className = "course-dropdown"
            options = {options}
            onChange = {userCourses => this.setState({userCourses})}
            isMulti="true"
            styles = {colourStyles}
          />
          </div>
          <p className="signin-input">Profile photo</p>
          <div>
          <label className="custom-file-upload">

          <input type="file"
          id="image"
          accept="image/png, image/jpeg"
          onChange={this.handleImageChange}
          />
          Upload Photo
          </label>
          </div>
          <p className="signin-input">Tutor status</p>
          <label className="signup-tutor-label"> I want to be an active tutor
          <input
            className= "signup-checkbox"
            type = "checkbox"
            name = "is_tutor"
            onChange = {this.handleChange}
            defaultChecked = {this.state.is_tutor}
          />
          </label>
          <div>
            {this.state.hasError ? <p  style={{color:"#d13e50"}}>Error updating profile</p> : null}
              <PrimaryButton onClick={() => {this.handleUpdate()}}>Update Profile</PrimaryButton>
            <Link to={{ pathname: "/signin/" }}>
              <SecondaryButton onClick={() => {this.handleLogout()}}>Log Out</SecondaryButton>
            </Link >
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(EditProfile);
