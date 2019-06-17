import React, { Component } from 'react';
import './styles.css';
import styled from 'styled-components';
import axios from "axios";
import Select from "react-select";
import NavBar from '../NavBar';

const colourStyles = {
  control: styles => ({ ...styles,
    backgroundColor: '#F8F8F8',
    border: '1px solid #ECECEC'
  }),
  placeholder: styles => ({...styles,
    color:'black',
  }),
};
const Button = styled.button`
  height: 40px;
  width: 250px;
  border: 2px solid #D9E2FF;
  border-radius: 4px;
  background-color: white;

font-weight:700;
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
        name: "Loading",
        profpicURL: "https://randomuser.me//portraits/men/4.jpg",
        bio: "",
        availabilities: "",
        courses: "",
        university: "",
        rating: "",
        reportCard: "",
        year: 2020,
        hourly_rate: 40
      },
      courses: [],
      isLoggedIn: localStorage.getItem('token') ? true : false,
      selectedCourse: -1,
      hasError: false,
      photo: {},
      redirect : false,
    };
    this.scheduleAppointment.bind(this);
  }

  componentDidMount() {

    // const { match: { params } } = this.props;

    // console.log(this.props.params.userID)
    // console.log(this.props.match.params.userID)

    this.getTutor(this.props.match.params.userID)
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
      .then(res => {
        this.setState({
          user: res.data,
        })
      })
  }

  getTutor(userID) {
    axios
      .get("/users/" + userID)
      .then(resA =>
        Promise.all([
          resA,
          axios.get('/images/'+resA.data.profile_image[0])
        ])
      )
      .then(
        ([resA,resB])=>{
          // console.log(resA)
          const photo = "https://tutoredu.herokuapp.com/api/" +
            resB.data.image.substring(31,resB.data.image.length)
          this.setState({
            tutor: resA.data,
            photo: photo
          })
          this.getCourses(resA.data.courses)
        }
      )
      .catch((err)=>{
        console.log(err.message)
      })
  }

  getCourses(courses) {
    for(let course of courses) {
      axios
        .get("/courses/" + course)
        .then(res => {
          this.setState(state => {
            // console.log(res.data)
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
    if (this.state.hasError || this.state.tutor.id === this.state.user.id){
      this.setState({hasError:true})
      return(undefined)
    }
    console.log(this.state.selectedCourse)
    var appointment = {
      id: Math.floor(Math.random() * 100000),
      tutor: this.state.tutor.id,
      student: this.state.user.id,
      course: this.state.selectedCourse.value,
      additional_comments: document.getElementById('description').value,
      availabilities: document.getElementById('availabilities').value,
      is_active: true,
      location: "blank",
      status: "Waiting for tutor response",
      rating: 5,
    }

    console.log(appointment);
    this.setState({redirect:true})
    axios.post('/appointments/', appointment)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        this.setState({hasError:true})
      });
  }

  render() {
    if (this.state.redirect){
      window.location.assign("/appointments");
    }
    const options = this.state.courses.map(course => {
      const newCourse = {value: course.id,label:course.name}
      return(newCourse)
    })
    const courses = this.state.courses
    var tutorCourses = "None"

    for(let i = 0; i < courses.length; i++) {
      if (i === 0) {
        tutorCourses = courses[i].name
      } else if (i === courses.length - 1 && courses.length!==2) {
        tutorCourses = tutorCourses + ", and " + courses[i].name
      } else {
        tutorCourses = tutorCourses + ", " + courses[i].name
      }

    }
    return (
      <div>
      <NavBar />
      <div className="tutor">
        <div className="tutor-TutorProfile">
          <div className="tutor-topHeader">
            <div className="tutor-picture">
            <img  src={ this.state.photo}
                  alt={ this.state.tutor.name }
                  className="tutor-profpicture"/>
            </div>
            <p></p>
            <div className="tutor-info">
            <h3 className="tutor-schoolYearAndRate">{this.state.tutor.university.toUpperCase()} • {this.state.tutor.year.toString().toUpperCase()} • ${this.state.tutor.hourly_rate}/HOUR</h3>
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
            </div>
        </div>
        <div className="tutor-appointment">
          <p className="tutor-appointment-main">Schedule an appointment</p>
          <p className="schedule-input">Select a course</p>
          {options.length > 0?
            <Select
              className = "course-dropdown"
              styles = {colourStyles}
              options = {options}
              onChange = {selectedCourse => this.setState({selectedCourse})}
            />: <p> No courses available </p>
          }
          <p></p>
          <p className="schedule-input">Enter your availabilities</p>
          <input className="text-input-box" id="availabilities" type="text" placeholder="Friday 10am-2pm...">
          </input>
          <p></p>
          <p className="schedule-input">Briefly describe the kind of help you need</p>
          <textarea className="textarea-input-box" id="description" type="text" placeholder="Midterm test prep on integrals..."></textarea>
          <p></p>
          {this.state.isLoggedIn && this.state.tutor !== null && this.state.user !== null && this.state.tutor.id !== this.state.user.id ? (
            <div>
                <Button className="submit-request" onClick={() => {this.scheduleAppointment()}}>Submit Request</Button>
              <p></p>
              <p className="availability-details">We will get back to you within 24 hours.</p>
              {this.state.hasError ?
                <p style={{color: "#d13e50", textAlign: "center" }} className="availability-details">Error scheduling appointment</p>
                :
                null
              }
            </div>
          ) : (
            this.state.tutor !== null && this.state.user !== null && this.state.tutor.id === this.state.user.id ?
              <p style={{ textAlign: "center" }} className="availability-details"><br/>You can't book an appointment with youself!</p> :
              <p style={{ textAlign: "center" }} className="availability-details"><br/>Please sign in to schedule an appointment.</p>

          )}

        </div>
      </div>
    </div>
    )
  }
}

export default TutorProfile;
