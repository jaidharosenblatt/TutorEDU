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
      user: null,
    };
  }

  componentDidMount() {
    this.getCurrentUser()
  }

  getCurrentUser() {
    var config = {
      headers: {"Authorization": `Token ${localStorage.getItem('token')}`}
    };
    

    axios
      .get('http://127.0.0.1:8000/api/current-user/', config)
      .then(res => {
        console.log(res);
        this.setState({
          user: res.data,
        })
        this.getAppointments()
      })
  }

  getAppointments() {
    // axios
    //   .get("/appointments")
    //   .then(res => {
    //     console.log(res);
    //     this.setState({
    //       appointments: res.data,
    //     })
    //   })
    //   .catch(err => console.log(err));
    var pendingAppointments = []
    var scheduledAppointments = []
    const unfilteredAppointments = this.state.user.tutor_appointments.concat(this.state.user.student_appointments)

    for (let appointment of unfilteredAppointments) {
      if (appointment.status === "Waiting for tutor response" || appointment.status === "Waiting for response") {
        pendingAppointments.push(appointment)
      } else {
        scheduledAppointments.push(appointment)
      }
    }

    this.setState({
      pendingAppointments: pendingAppointments,
      scheduledAppointments: scheduledAppointments,
    })

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
