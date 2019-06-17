import React, { Component } from 'react';
import './styles.css';
import styled from 'styled-components';
import axios from "axios";
import { Link } from "react-router-dom";

const Button = styled.button`
  height: 40px;
  width: 230px;
  border: 2px solid #D9E2FF;
  border-radius: 4px;
  background-color: white;

font-weight:700;
  font-size: 12px;
  color: #1C3A9F;
  letter-spacing: 0;
  text-align: center;

  :hover {
    color: white;
    border: 0px;
    background-color: #1C3A9F;
  }
`;

class TutorCard extends Component {
  constructor(){
    super()
    this.state = {
      loading:true,
      courses: [],
      photo: "",
      photoUser: -1,
    }
  }

  componentDidMount() {
    this.getPhoto(this.props.user.profile_image[0])
    this.setState({loading:false})
    axios
      .get("/courses/")
      .then(res => {
        this.setState({courses:res.data})
      })
      .catch(err => console.log(err));
  }

  getPhoto(photoID){
    axios
      .get('/images/'+photoID)
      .then(res => {
        // console.log(res.data.image)
        const photo = "https://tutoredu.herokuapp.com/api/" +
          res.data.image.substring(31,res.data.image.length)
        this.setState({photo : photo, photoUser:res.data.user})
      })
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.photoUser !== this.props.user.id){
      this.getPhoto(this.props.user.profile_image[0])
    }
    const courses = this.state.courses
    const coursesIDs = this.props.user.courses
    const tutorCourses = coursesIDs.map(id=>{
        const courseName = courses.find(course =>
          course.id === id
          )
        return(courseName)
    }
    )
    // console.log(this.props.user.name)
    // console.log(tutorCourses)
    var studentCourses = "None"
    if (tutorCourses.length>0 && tutorCourses[0]!== undefined){
      for(let i = 0; i < tutorCourses.length; i++) {
      if (i === 0) {
        studentCourses = tutorCourses[i].name
      } else if (i === courses.length - 1 & tutorCourses.length!==2) {
        studentCourses = studentCourses + ", and " + tutorCourses[i].name
      } else {
        studentCourses = studentCourses + ", " + tutorCourses[i].name
      }
    }
    }

    return (

        <div className="tutor-card">
          <Link to={{ pathname: "/tutors/" + this.props.user.id }}>
            <img  src={ this.state.photo}
                  alt={ "TUTOR" }
                  className="tutor-profpic" />
          </Link>
          <h3 className="tutor-name">{this.props.user.name}</h3>
          <p className="paragraph">{this.props.user.bio}</p>
          <h4 className="tutor-availabilities">COURSES</h4>
          <p className="paragraph">{ studentCourses }</p>
          <h4 className="tutor-availabilities">AVAILABILITIES</h4>
          <p className="paragraph">{this.props.user.availabilities}</p>
            <Link to={{ pathname: "/tutors/" + this.props.user.id }}>
              <Button>View Profile</Button>
            </Link>
        </div>
    )
  }
}

export default TutorCard;
