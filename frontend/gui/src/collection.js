import React, { Component } from 'react';
import TutorCard from './TutorCard';
import axios from "axios";

class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove() {
    this.setState({users: this.state.users.filter(user => user.id === 1)})
  }

  componentDidMount() {

    axios
      .get(" http://127.0.0.1:8000/api/users/")
      .then(res => this.setState({ users: res.data.filter(user => user.is_tutor && user.is_active) }))
      .catch(err => console.log(err));
    
  }



  render() {
    return  (
      <div className="app">
        <div className="collection">
          <h2 className="upcoming-appointments-text">Browse Tutors</h2>
            {this.state.users.map((user,k) => (
              <TutorCard  key={k}
                          user={user}/>
            ))}
            <p className="tutor-results">{this.state.users.length} tutors found.</p>
          </div>
        </div>
      )
    }
  }

export default Collection;
