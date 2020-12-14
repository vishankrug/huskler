import React from 'react';
import {Card, CardText, CardBody,CardLink, CardTitle, Col, Row} from 'reactstrap';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import { useParams } from "react-router-dom";
import sample_people from './People.json';



export function PeopleList(props){
    let peoples = props.people;

    let peopleCards = peoples.map((individual) => {
    return <PeopleCard key={individual.email} people={individual} />
  })
   
  return(
    <Row>
      {peopleCards}
    </Row>

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
    const [redirectTo, setRedirectTo] = useState(undefined);
    let fullname = useParams().fullname;
    let person =  _.find(sample_people, {fname:fullname});

    if(!person) return <h2>No person specified</h2>

    const handleClick = () => {
      setRedirectTo("/people");
    }

    if(redirectTo !== undefined){
      return <Redirect push to={redirectTo} />
    }

    return(
      <div>
        <img className="people_image" src={"../"+person.image}  alt={"an image for " + person.fname + " "+ person.lname}/>
        <h2>{person.fname + " " + person.lname}</h2>
        <p><strong>Major: </strong>{person.major}</p>
        <p><strong>Interests: </strong>{person.interests}</p>
        <p><strong>Class Standing: </strong>{person.year}</p>
        <p><strong>Email: </strong>{person.email}</p>
        <p><strong>Bio: </strong>{person.bio}</p>
        <button className="button" varient="Dark" onClick={handleClick}>Back</button>
      </div>
    )
  }