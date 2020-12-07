import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardText, CardBody,CardLink, CardTitle, CardSubtitle, Col, Row} from 'reactstrap';

export function PeopleList(props){
    let people = props.people;
  let peopleCards = people.map((individual) => {
    return <PeopleCard key ={people.lname} people={individual} />
  })
   
  return(
    <Row>
      {peopleCards}
    </Row>

  )
}

export function PeopleCard(props) {
    let people = props.people;
  
    return (
      <Col md="6" className="mt-4">
        <Card tag="a" className="clickable">
          <div className="image-div">
            <img src={people.image} alt={"an image for " + people.fname + people.lname} />
          </div>
          <CardBody>
            <CardTitle tag="h3" className="text-center">{people.fname + people.lname}</CardTitle>
            <CardText className="text-center">{"Hosted by: " + people.major}</CardText>
            <CardText className="text-center">{"Hosted by: " + people.year}</CardText>
            <CardText className="text-center">{"Hosted by: " + people.interests}</CardText>
            <CardText className="text-center">{"Hosted by: " + people.email}</CardText>
            <CardLink href="">Click to learn more!</CardLink>
          </CardBody>
        </Card>
  
      </Col>
    )
  }