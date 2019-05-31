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
      .get('http://127.0.0.1:8000/api/current-user/', config)
      .then(res => {
        const studentAppointments = res.data.student_appointments
        const tutorAppointments = res.data.tutor_appointments
        const allAppointments = studentAppointments.concat(tutorAppointments)
        var pendingAppointments = []
        var scheduledAppointments = []
        console.log(allAppointments)
        for (var i=0; i< allAppointments.length; i++) {
          const appointment = allAppointments[i]
          if (appointment.status === "Waiting for tutor response" || appointment.status === "Waiting for response") {
            scheduledAppointments.push(appointment)
          } else {
            pendingAppointments.push(appointment)
          }
        }
        this.getPendingAppointments(pendingAppointments)
        this.getScheduledAppointments(scheduledAppointments)
        this.setState({
          user: res.data,
        })
      })
      .catch(err =>{
        console.log(err)
      })
   }
  getPendingAppointments(appointments) {
    for(let appointment of appointments){
      axios
        .get("http://127.0.0.1:8000/api/appointments/"+appointment)
        .then(res => {
          this.setState(state => {
            // console.log(res.data)
            const appointments = state.pendingAppointments.push(res.data);
            return {
              appointments,
            };
          });
        })
        .catch(err => console.log(err));
    }
  }
  getScheduledAppointments(appointments) {
    for(let appointment of appointments){
      axios
        .get("http://127.0.0.1:8000/api/appointments/"+appointment)
        .then(res => {
          this.setState(state => {
            // console.log(res.data)
            const appointments = state.scheduledAppointments.push(res.data);
            return {
              appointments,
            };
          });
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    return (
      <div className="appointments-container">
        <div className="upcoming-appointments">
          <h2 className="upcoming-appointments-text">Pending Appointments</h2>
          {this.state.pendingAppointments.length > 0 ? (
            this.state.pendingAppointments.map((appointment,k) => (
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
            {this.state.scheduledAppointments.length > 0 ? (
              this.state.scheduledAppointments.map((appointment,k) => (
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
