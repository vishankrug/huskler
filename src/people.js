import React from 'react';
import {Card, CardText, CardBody,CardLink, CardTitle, Col, Row} from 'reactstrap';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';



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
      console.log("/people/"+props.people.fname);
      setRedirectTo("/people/"+props.people.fname)
    }

    if(redirectTo !== undefined){
      return <Redirect push to={redirectTo} />
    }

    return (
      <Col  className="mt-4 col-sm-4" onClick={handleClick}>
        <Card className="clickable">
          <div className= "mx-auto">
            <img className="rounded-circle people_image" src={people.image}  alt={"an image for " + people.fname + people.lname}/>
          </div>
          <CardBody className="card-body">
            <CardTitle tag="h3" className="name text-center">{people.fname + " " + people.lname}</CardTitle>
            <CardText className="card-info">{"Major: " + people.major}</CardText>
            <CardText className="card-info">{"Class Standing: " + people.year}</CardText>
            <CardText className="card-info">{"Interests: " + people.interests}</CardText>
            <CardText className="card-info">{"Email: " + people.email}</CardText>
            <CardLink>Click to learn more!</CardLink>
          </CardBody>
        </Card>
  
      </Col>
    )
  }

  

