import React from 'react';
import {Card, CardText, CardBody,CardLink, CardTitle, Col, Row} from 'reactstrap';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import { useParams } from "react-router-dom";
import {BackButton} from './Buttons.js';
import { Button } from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { SearchBarPage } from './Search.js';



export function PeopleList(props){
    let people = props.people;
  //search states
  const [nameState, setNameSearch] = useState('');
  const [majorState, setMajorSearch] = useState('');
  const [interestsState, setInterestsSearch] = useState('');


  //filter the results by search
  let filteredPeople = people.filter((person) => {
    return (person.fname.toLowerCase().indexOf(nameState.toLowerCase()) !== -1 || person.lname.toLowerCase().indexOf(nameState.toLowerCase())!== -1) || ((person.fname.toLowerCase()+ " " + person.lname.toLowerCase()).indexOf(nameState.toLowerCase()) !== -1);
  });

  if(majorState !== ''){
    filteredPeople = filteredPeople.filter((person) => {
      return (person.major.toLowerCase().indexOf(majorState.toLowerCase()) !== -1);
    });
  }

  if(interestsState !== ''){
    filteredPeople = filteredPeople.filter((person) => {
      return (person.interests.toLowerCase().indexOf(interestsState.toLowerCase()) !== -1);
    });
  }

  //setStates

  const updateNameSearch = (person) => {
    setNameSearch(person.target.value);
  }

  const updateMajorSearch = (person) => {
    setMajorSearch(person.target.value);
  }

  const updateInterestsSearch = (person) => {
    setInterestsSearch(person.target.value);
  } 

  const clearPeople = () => {
    setNameSearch('');
    setInterestsSearch('');
    setMajorSearch('');
  }

    let peopleCards = filteredPeople.map((individual) => {
    return <PeopleCard key={individual.email} people={individual} />
  })

  
  const postUser = (event) => {
    //event.preventDefault();

    const newPerson = {
      name: props.user.displayName,
      major: "-",
      interest: "-",
      year: "-",
      email: props.user.email,
      bio: "-"
    }

    const peopleRef = firebase.database().ref('people')
    peopleRef.push(newPerson);

  }

  postUser(props.user);

  return(
    <div>
      <div className="search-bar">
        <SearchBarPage updateNameSearch={updateNameSearch} nameState={nameState} updateMajorSearch={updateMajorSearch} majorState={majorState} interestsState={interestsState} updateInterestsSearch={updateInterestsSearch} clearPeople={clearPeople} ></SearchBarPage>
      </div>
    <Row>
      {peopleCards}
    </Row>
    </div>
  )
}

export function PeopleCard(props) {
  
    const [redirectTo, setRedirectTo] = useState(undefined);

    let people = props.people;

    const handleClick = () => {
      setRedirectTo("/people/"+people.fname);
    }

    if(redirectTo !== undefined){
      return <Redirect push to={redirectTo} />
    }

    return (
      <Col  className="mt-4 col-sm-4" onClick={handleClick}>
        <Card className="clickable">
          <div className= "mx-auto">
            <img className="rounded-circle people_image" src={people.image}  alt={"an image for " + people.fname + " " + people.lname}/>
          </div>
          <CardBody className="card-body">
            <CardTitle tag="h3" className="name text-center">{people.fname + " " + people.lname}</CardTitle>
            <CardText className="card-info">{"Major: " + people.major}</CardText>
            <CardText className="card-info">{"Interests: " + people.interests}</CardText>
            <CardLink>Click to learn more!</CardLink>
          </CardBody>
        </Card>
  
      </Col>
    )
  }

  export function PeopleDetails(props){
    let fullname = useParams().fullname;
    let person =  _.find(props.people, {fname:fullname});

    return(
      <div>
        <img className="people_image" src={"../"+person.image}  alt={"an image for " + person.fname + " "+ person.lname}/>
        <h2>{person.fname + " " + person.lname}</h2>
        <p><strong>Major: </strong>{person.major}</p>
        <p><strong>Interests: </strong>{person.interests}</p>
        <p><strong>Class Standing: </strong>{person.year}</p>
        <p><strong>Email: </strong>{person.email}</p>
        <p><strong>Bio: </strong>{person.bio}</p>
        <BackButton page="/people" />
        
      </div>
    )
  }

  export function PeoplePopUp(props){
    return(
      <form className="form">
        Name: <input type="text" name="name" value={props.user.displayName}/>
        Major: <input type="text" name="major" value={''}/>
        Interest: <input type="text" name="interests" value={''}/>
        Class Standing: <input type="text" name="classStanding" value={''}/>
        Email: <input type="text" name="classStanding" value={props.user.email}/>
        Bio: <input type="text" name="classStanding" value={''}/>
        <Button color="primary" className="btn">Save!</Button>
        <BackButton page="/people" />
    </form>
    )
  }