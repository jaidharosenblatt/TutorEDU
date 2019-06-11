import React, { Component } from 'react';
import './styles.css';
import AppointmentCard from './AppointmentCard';
import axios from "axios";

class Appointments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pendingAppointments: [],
      scheduledAppointments: [],
      allAppointments: [],
      user: null,
    };
  }

  componentDidMount() {
    var config = {
      headers: {"Authorization": `Token ${localStorage.getItem('token')}`}
    };
    axios
      .get('/current-user/', config)
      .then(res => {
        const studentAppointments = res.data.student_appointments
        const tutorAppointments = res.data.tutor_appointments
        const allAppointments = studentAppointments.concat(tutorAppointments)
        this.getAppointments(allAppointments)
        this.setState({
          user: res.data,
        })
      })
      .catch(err =>{
        console.log(err)
      })
   }


  getAppointments(appointments) {
    for(let appointment of appointments){
      axios
        .get("/appointments/"+appointment)
        .then(res => {
          this.setState(state => {
            // console.log(res.data)
            const appointments = state.allAppointments.push(res.data);
            return {
              appointments,
            };
          });
        })
        .catch(err => console.log(err));
    }
  }

  render() {

    var pendingAppointments = []
    var scheduledAppointments = []
    const allAppointments = this.state.allAppointments
    console.log(allAppointments)
    for (var i=0; i< allAppointments.length; i++) {
      const appointment = allAppointments[i]
      if (appointment.status === "Waiting for tutor response" || appointment.status === "Waiting for response") {
        pendingAppointments.push(appointment)
      }
      else {
        scheduledAppointments.push(appointment)
      }
    }
    return (
      <div className="appointments-container">
        <div className="upcoming-appointments">
          <h2 className="upcoming-appointments-text">Pending Appointments</h2>
          {pendingAppointments.length > 0 ? (
            pendingAppointments.map((appointment,k) => (
              <AppointmentCard  key={k}
                                appointment={appointment}
                                currentUserID={this.state.user.id}/>
            ))
          ) : (
            <p className="tutor-results">No pending appointments</p>
          )}
        </div>
        <div className="past-appointments">
          <h2 className="past-appointments-text">Scheduled Appointments</h2>
            {scheduledAppointments.length > 0 ? (
              scheduledAppointments.map((appointment,k) => (
                <AppointmentCard  key={k}
                                  appointment={appointment}
                                  currentUserID={this.state.user.id}/>
              ))
            ) : (
              <p className="tutor-results">No scheduled appointments</p>
            )}
        </div>
      </div>
    )
  }
}

export default Appointments;
