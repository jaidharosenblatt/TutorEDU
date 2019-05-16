import React, { Component } from 'react';
import './styles.css';
import styled from 'styled-components';
import axios from "axios";
import { Link } from "react-router-dom";

const StyledDropdown = styled.select`
  height: 40px;
  width: 250px;
  border: 1px solid #ECECEC;
  border-radius: 4px;
  font-family: Avenir-Heavy;
  font-size: 12px;
  color: black;
  letter-spacing: 0;
  text-align: center;
  justifyContent: center;
  alignItems: center;
`;

const Button = styled.button`
  height: 40px;
  width: 250px;
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

  :image {
    flex: 1,
    aspectRatio: 1.5,
    resizeMode: contain,
  }
`;

class TutorProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      tutor: {
        id: -1,
        name: "Alex Gerrese",
        profpicURL: "https://randomuser.me/api/portraits/men/4.jpg",
        bio: "This is fake data for this bio. This is fake data for this bio. This is fake data for this bio.",
        availabilities: "4-9pm on Wednesdays and Fridays",
        courses: "Econ 174, Econ 256, CS 201, CS 230, CS 290",
        university: "Duke University",
        rating: "4.7/5",
        reportCard: "Econ 174: A-, Econ 256: A, CS 201: A, CS 230: A-, CS 290: A",
        year: 2020,
        hourly_rate: 40
      },
      courses: [],
      isLoggedIn: localStorage.getItem('token') ? true : false,
      selectedCourse: -1,
    };
    this.scheduleAppointment.bind(this);
  }

  componentDidMount() {

    // const { match: { params } } = this.props;

    // console.log(this.props.params.userID)
    console.log(this.props.match.params.userID)

    this.getTutor(this.props.match.params.userID)
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
        this.setState({
          user: res.data,
        })
      })
  }

  getTutor(userID) {
    axios
      .get(" http://127.0.0.1:8000/api/users/" + userID)
      .then(res => {
        this.setState({ tutor: res.data })
        this.getCourses(this.state.tutor.courses)
      })
      .catch(err => console.log(err));
  }

  getCourses(courses) {

    for(let course of courses) {
      axios
        .get("http://127.0.0.1:8000/api/courses/" + course.id)
        .then(res => {
          this.setState(state => {
            console.log(res.data)
            const courses = state.courses.concat(res.data);
            return {
              courses,
            };
          });
        })
        .catch(err => console.log(err));
    }
  }

  scheduleAppointment() {

    var appointment = {
      id: Math.floor(Math.random() * 100000),
      tutor: this.state.tutor.id,
      student: this.state.user.id,
      course: parseInt(this.state.selectedCourse, 10) !== -1 ? parseInt(this.state.selectedCourse, 10) : this.state.courses[0].id,
      additional_comments: document.getElementById('description').value,
      availabilities: document.getElementById('availabilities').value,
      is_active: true,
      location: "blank",
      status: "Waiting for tutor response",
      rating: 5,
    }

    console.log(appointment);

    axios.post('http://127.0.0.1:8000/api/appointments/', appointment)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleChange = (e) => {
    this.setState({ selectedCourse: e.target.value });
  }

  render() {

    const courses = this.state.courses
    var tutorCourses = ""

    for(let i = 0; i < courses.length; i++) {
      if (i === 0) {
        tutorCourses = courses[i].course_name
      } else if (i === courses.length - 1) {
        tutorCourses = tutorCourses + ", and " + courses[i].course_name
      } else {
        tutorCourses = tutorCourses + ", " + courses[i].course_name
      }

    }
    return (
      <div className="tutor">
        <div className="tutor-TutorProfile">
          <div className="tutor-topHeader">
            <div className="tutor-picture">
            <img  src={ this.state.tutor.profile_image}
                  alt={ this.state.tutor.name }
                  className="tutor-profpicture"/>
            </div>
            <p></p>
            <div className="tutor-info">
            <h3 className="tutor-schoolYearAndRate">{this.state.tutor.university.toUpperCase()} • SENIOR • ${this.state.tutor.hourly_rate}/HOUR</h3>
            <h1 className="tutor-named">{this.state.tutor.name}</h1>
            <p className="tutor-description">{this.state.tutor.bio}</p>
            </div>
          </div>
          <div className="tutor-stats">
            <div className="tutor-rating">
              <p></p>
              <h4 className="tutor-rating">RATING</h4>
              <p className="rating-details">
              {this.state.tutor.tutor_rating}/5 stars</p>
            </div>
            <div className="tutor-classes">
              <h4 className="tutor-classes">CLASSES</h4>
              <p className="class-details">{ tutorCourses }</p>
            </div>
            <div className="tutor-availability">
              <h4 className="tutor-availability">AVAILABILITIES</h4>
              <p className="availability-details">
              {this.state.tutor.availabilities}</p>
            </div>
            <div className="tutor-reportCard">
              <h4 className="tutor-reportCard">REPORT CARD</h4>
              <p className="RCdetails">{ this.state.tutor.report_card }</p>
            </div>
            </div>
        </div>
        <div className="tutor-appointment">
          <p className="tutor-appointment-main">Schedule an appointment</p>
          <p className="schedule-input">Select a course</p>
          {this.state.courses.length > 0 &&
            <StyledDropdown onChange={this.handleChange}>
              {this.state.courses.map((course,k) => (
                <option className="course-select" key={k} value={course.id}>{course.course_name}</option>
              ))}
            </StyledDropdown>
          }
          <p></p>
          <p className="schedule-input">Enter your availabilities</p>
          <input className="text-input-box" id="availabilities" type="text" placeholder="Friday 10am-2pm...">
          </input>
          <p></p>
          <p className="schedule-input">Briefly describe the kind of help you need</p>
          <textarea className="textarea-input-box" id="description" type="text" placeholder="Midterm test prep on integrals..."></textarea>
          <p></p>
          {this.state.isLoggedIn ? (
            <div>
              <Link to={{ pathname: "/appointments/" }}>
                <Button className="submit-request" onClick={() => {this.scheduleAppointment()}}>Submit Request</Button>
              </Link>
              <p></p>
              <p className="availability-details">We will get back to you within 24 hours.</p>
            </div>
          ) : (
            <p style={{ textAlign: "center" }} className="availability-details"><br/>Please sign in to schedule an appointment.</p>
          )}
        </div>
      </div>
    )
  }
}

export default TutorProfile;
