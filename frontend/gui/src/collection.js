import React, { Component } from 'react';
import TutorCard from './TutorCard';
import axios from "axios";
import styled from 'styled-components';
import Select from "react-select";


const PrimaryButton = styled.button`
  height: 44px;
  width: 160px;
  background-color: #1C3A9F;
  border-radius: 4px;
  font-family: Avenir-Heavy;
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

const colourStyles = {
  control: styles => ({ ...styles,
    backgroundColor: '#F8F8F8',
    border: '1px solid #ECECEC'
  }),
  placeholder: styles => ({...styles,
    color:'black',
  }),
};

class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      courses: [],
      courseFilter: [],
    };
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove() {
    this.setState({users: this.state.users.filter(user => user.id === 1)})
  }

  componentDidMount() {
    this.getUsers()
    this.getCourses()
  }

  getUsers(){
    axios
      .get(" http://127.0.0.1:8000/api/users/")
      .then(res => this.setState({ users: res.data.filter(user => user.is_tutor && user.is_active) }))
      .catch(err => console.log(err));
  }

  getCourses(){
    axios
      .get(" http://127.0.0.1:8000/api/courses/")
      .then(res => this.setState({ courses: res.data}))
      .catch(err => console.log(err));
  }


  render() {
    const options = this.state.courses.map(course => {
      const newCourse = {value: course.id,label:course.name}
      return(newCourse)
    })
    console.log(this.state)
    return  (
      <div className="app">
        <div className="collection">
        <h2 className="upcoming-appointments-text">Browse Tutors</h2>
          <div className = "Filter">
          <Select
            className = "course-dropdown"
            options = {options}
            onChange = {courseFilter => this.setState({courseFilter})}
            isMulti="true"
            styles = {colourStyles}
          />
          <PrimaryButton onClick={() => {this.handleRemove()}}>Filter</PrimaryButton>
          </div>
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
