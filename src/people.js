import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardText, CardBody,CardLink, CardTitle, CardSubtitle, Col, Row} from 'reactstrap';


export function PeopleList(props){
    let peoples = props.people;
    let peopleCards = peoples.map((individual) => {
    return <PeopleCard key ={peoples.email} people={individual} />
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
      <Col  className="mt-4 col-sm-4">
        <Card tag="a" className="clickable">
          <div className= "mx-auto">
            <img className="rounded-circle people_image" src={people.image}  alt={"an image for " + people.fname + people.lname}/>
          </div>
          <CardBody className="card-body">
            <CardTitle tag="h3" className="name text-center">{people.fname + " " + people.lname}</CardTitle>
            <CardText className="card-info">{"Major: " + people.major}</CardText>
            <CardText className="card-info">{"Class Standing: " + people.year}</CardText>
            <CardText className="card-info">{"Interests: " + people.interests}</CardText>
            <CardText className="card-info">{"Email: " + people.email}</CardText>
            <CardLink href="">Click to learn more!</CardLink>
          </CardBody>
        </Card>
  
      </Col>
    )
  }