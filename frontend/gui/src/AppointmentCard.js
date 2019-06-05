import React, { Component } from 'react';
import './styles.css';
import styled from 'styled-components';
import axios from "axios";

const SaveButton = styled.button`
  height: 40px;
  width: 125px;
  border: 2px solid #D9E2FF;
  border-radius: 4px;
  font-family: Avenir-Heavy;
  font-size: 12px;
  color: #1C3A9F;
  letter-spacing: 0;
  text-align: center;
  justifyContent: center;
  alignItems: center;
  margin: 8px;

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

const CancelButton = styled.button`
  height: 40px;
  width: 125px;
  border: 2px solid #EDB7B7;
  border-radius: 4px;
  font-family: Avenir-Heavy;
  font-size: 12px;
  color: #C93131;
  letter-spacing: 0;
  text-align: center;
  justifyContent: center;
  alignItems: center;
  margin: 8px;

  :hover {
    color: white;
    border: 0px;
    background-color: #C93131;
  }

  :image {
    flex: 1,
    aspectRatio: 1.5,
    resizeMode: contain,
  }
`;

class AppointmentCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tutor: null,
      student: null,
      photo: null,
      appointment: this.props.appointment,
      courseName: "",
    };

  }
  componentDidMount() {
    this.getCourseNameFromId(this.props.appointment.course)
    this.getTutorFromId(this.state.appointment.tutor)
    this.getStudentFromId(this.state.appointment.student)
  }
  getCourseNameFromId(courseID) {
    axios
      .get("http://127.0.0.1:8000/api/courses/" + courseID)
      .then(res => this.setState({ courseName: res.data.name }))
      .catch(err => console.log(err));
  }
  getTutorFromId(tutorID) {
    axios
      .get('http://127.0.0.1:8000/api/users/'+ tutorID)
      .then(resA =>
        // console.log(resA.data.profile_image[0])
        Promise.all([
          resA,
          axios.get('http://127.0.0.1:8000/api/images/'+resA.data.profile_image[0])
        ])
      )
      .then(
        ([resA,resB])=>{
          // console.log(resA)
          this.setState({
            tutor: resA.data,
            photo: resB.data
          })
        }
      )
      .catch((err)=>{
        console.log(err.message)
      })
  }
  getStudentFromId(studentID) {
    axios
      .get('http://127.0.0.1:8000/api/users/'+ studentID)
      .then(res => this.setState({student:res.data}))
      .catch((err)=>{
        console.log(err.message)
      })
  }
  handleAction(actionType) {
    var updatedFields;

    if (actionType === "save") {
      updatedFields = {
        additional_comments: document.getElementById('description').value,
        availabilities: document.getElementById('availabilities').value,
      }
    } else if (actionType === "cancel") {
      updatedFields = {
        is_active: false,
        status: "Canceled"
      }
    } else if (actionType === "confirm") {
      updatedFields = {
        status: "Confirmed"
      }
    } else if (actionType === "decline") {
      updatedFields = {
        status: "Declined"
      }
    }
    window.location.reload();
    console.log(updatedFields)

    axios
      .patch("http://127.0.0.1:8000/api/appointments/" + this.state.appointment.id, updatedFields)
      .then(res => {
        console.log(res)
        this.setState({ appointment: res.data })
      })
      .catch(err => console.log(err));
  }

  render() {
    // Conditionally render appointment status
    const appointmentStatus = this.state.appointment.status
    var statusComponent;
    var isScheduled = false;

    if (appointmentStatus === "Canceled" || appointmentStatus === "Declined") {
      statusComponent = <p className="appointment-status" style={{"color": "#C93131"}}>{ this.state.appointment.status.toUpperCase() }</p>
      isScheduled = true;
    } else if (appointmentStatus === "Confirmed"){
      statusComponent = <p className="appointment-status" style={{"color": "green"}}>{ this.state.appointment.status.toUpperCase() }</p>
      isScheduled = true;
    } else {
      statusComponent = <p className="appointment-status" style={{"color": "#898989"}}>{ this.state.appointment.status.toUpperCase() }</p>
    }

    // Check if current user is tutor or client for this appointment and render as such
    const tutorID = this.state.appointment.tutor
    // const studentEmail = this.getTutorFromId(this.state.appointment.student)
    // const tutorEmail = this.getTutorFromId(this.state.appointment.tutor)

    const currentUserID = this.props.currentUserID
    var displayContact = false
    // var student = this.getTutorFromId(this.state.appointment.student)
    if (this.state.tutor!== null && this.state.appointment.status === "Confirmed"){
      displayContact = true
    }
    const courseName = this.state.courseName.length === 0 ? "No course specified" : this.state.courseName
    var userEmail = this.state.tutor === null ? null : this.state.tutor.email
    var userType = "tutor"
    var primaryButtonText = "Save changes"
    var secondaryButtonText = "Cancel Request"
    var primaryAction = "save"
    var secondaryAction = "cancel"
    var detailString = "TUTOR • " + courseName + " • $" + (this.state.tutor != null ? this.state.tutor.hourly_rate : "") + "/HOUR"
    var name = this.state.tutor != null ? this.state.tutor.name : "Loading..."
    if (tutorID === currentUserID) {
      userEmail = this.state.student === null ? null : this.state.student.email
      userType = "student"
      primaryButtonText = "Approve Request"
      secondaryButtonText = "Reject Request"
      primaryAction = "confirm"
      secondaryAction = "decline"
      detailString = "CLIENT • " + courseName + " • $" + (this.state.tutor != null ? this.state.tutor.hourly_rate : "") + "/HOUR"
      name = this.state.student === null ? null : this.state.student.name
    }

    return (
      <div className="appointment-card-container">
        <div className="appointment-card-card">
          <div className="appointment-card-left">
            <div className="appointment-card-text">
              <div className="appointment-card-left">
                <img className="appointment-card-profpic" src={ this.state.tutor != null ? this.state.photo.image : null } alt="Tutor Profile Pic"/>
              </div>
              <div className="appointment-card-left">
                { statusComponent }
                <h3 className="appointment-card-name">{name}</h3>
                <p className="appointment-card-details">{ detailString }</p>
              </div>
              { !isScheduled &&
                <div className="appointment-card-right">
                  <CancelButton onClick={() => {this.handleAction(secondaryAction)}}>{ secondaryButtonText }</CancelButton>
                  <SaveButton onClick={() => {this.handleAction(primaryAction)}}>{ primaryButtonText }</SaveButton>
                </div>
              }
              <div className="appointment-card-info">
              {displayContact ? <p> Please reach out to your {userType}: {userEmail} </p> : null}
                <div className="appointment-card-info-left">
                  <p className="schedule-input">Additional Information</p>
                  <textarea className="textarea-input-box" id="description" type="text" defaultValue={this.state.appointment.additional_comments} placeholder="Midterm test prep on integrals..."></textarea>
                </div>
                <div className="appointment-card-info-right">
                  <p className="schedule-input">Availabilities</p>
                  <input className="text-input-box" id="availabilities" type="text" defaultValue={this.state.appointment.availabilities} placeholder="Friday 10am-2pm..."></input>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default AppointmentCard;
