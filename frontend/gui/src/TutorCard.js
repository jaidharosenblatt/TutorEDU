import React, { Component } from 'react';
import './styles.css';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Button = styled.button`
  height: 40px;
  width: 230px;
  border: 2px solid #D9E2FF;
  border-radius: 4px;
  font-family: Avenir-Heavy;
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

  render() {

    const courses = this.props.user.courses
    var studentCourses = ""

    for(let i = 0; i < courses.length; i++) {
      if (i === 0) {
        studentCourses = courses[i].course_name
      } else if (i === courses.length - 1) {
        studentCourses = studentCourses + ", and " + courses[i].course_name
      } else {
        studentCourses = studentCourses + ", " + courses[i].course_name
      }

    }

    return (
        <div className="tutor-card">
          <img  src={ this.props.user.profile_image}
                alt={ "TUTOR NAME" }
                className="tutor-profpic" />
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
