import React, { Component } from 'react';
import TutorCard from './TutorCard';
import axios from "axios";
import styled from 'styled-components';
import Select from "react-select";


const PrimaryButton = styled.button`
  height: 40px;
  width: 160px;
  border: 2px solid #D9E2FF;
  background-color: #F8F9FA;
  border-radius: 4px;
  border: 1px solid #ECECEC;
  font-family: Avenir-Book;
  font-size: 14px;
  color: black;
  letter-spacing: 0;
  text-align: center;
  justifyContent: center;
  alignItems: center;
  margin-top: 10px;


  :hover {
    color: white;
    border: 0px;
    background-color: #1C3A9F;
  }
`;
const colourStyles = {
  control: styles => ({ ...styles,
    backgroundColor: '#F8F9FA',
    border: '1px solid #ECECEC',
    fontSize: '14',
    fontFamily: 'Avenir-Book',
  }),
  placeholder: styles => ({...styles,
    color:'black',
  }),
  option: styles => ({...styles,
    fontSize: '14',
    fontFamily: 'Avenir-Book',
    textAlign: 'left',
  }),
};

class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      photo: null,
      filteredUsers: [],
      courses: [],
      courseFilter: [],
    };
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove() {
    const courses = this.state.courseFilter
    if (courses.length === 0){
      this.setState({filteredUsers: this.state.users
      })
      return
    }
    var courseIDs = new Array(courses.length)
    for(var i = 0; i < courses.length; i++){
      courseIDs[i] = (courses[i].value)
    }
    this.setState({filteredUsers: this.state.users.filter(user =>
      courseIDs.some(r=> user.courses.indexOf(r) >= 0)
    )})
    this.forceUpdate()
  }

  componentDidMount() {
    this.getUsers()
    this.getCourses()
  }

  getUsers(){
    axios
      .get(" http://127.0.0.1:8000/api/users/")
      .then(res => {
        const myUsers =  res.data.filter(user => user.is_tutor && user.is_active)
        this.setState({
          users: myUsers,
          filteredUsers: myUsers})
      })
      .catch(err => console.log(err));
  }

  getCourses(){
    axios
      .get(" http://127.0.0.1:8000/api/courses/")
      .then(res => this.setState({ courses: res.data}))
      .catch(err => console.log(err));
  }

  // getPhoto(photoID){
  //   axios
  //     .get('http://127.0.0.1:8000/api/images/'+photoID)
  //     .then(res => {
  //       // console.log(res.data.image)
  //       return res.data.image
  //       // this.setState({photo : res.data.image })
  //     })
  //     .catch(err => console.log(err));
  // }

  render() {
    const options = this.state.courses.map(course => {
      const newCourse = {value: course.id,label:course.name}
      return(newCourse)
    })
    // var newUsers = this.state.filteredUsers
    // for (var i = 0; i < newUsers.length; i++){
    //   var user = newUsers[i]
    //   user['photo'] = 'this.getPhoto(user.profile_image[0])'
    //   newUsers[i] = user
    // }
    // console.log(newUsers)
    return  (
      <div className="app">
        <div className="collection">
        <h2 className="upcoming-appointments-text">Browse Tutors</h2>
          <div className = "Filter">
          <Select
            className = "course-dropdown-filter"
            options = {options}
            onChange = {courseFilter => this.setState({courseFilter})}
            isMulti="true"
            styles = {colourStyles}
            placeholder = "Filter by course..."
          />
          <PrimaryButton onClick={() => {
            this.handleRemove()
          }}>Filter</PrimaryButton>
          </div>
            {this.state.filteredUsers.map((user,k) => (
              <TutorCard  key={k}
                          user={user}
                          />
            ))}
            <p className="tutor-results">{this.state.filteredUsers.length} tutors found.</p>

          </div>
        </div>
      )
    }
  }

export default Collection;
