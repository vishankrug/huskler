import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardText, CardBody,CardLink, CardTitle, CardSubtitle, Col, Row} from 'reactstrap';

export function EventsList(props){
  let events = props.events;
  let eventCards = events.map((event) => {
    return <EventCard key ={events.title} event={event} />
  })
   
  return(
    <Row>
      {eventCards}
    </Row>

  )
}

export function EventCard(props) {
  let event = props.event;

  return (
    <Col md="6" className="mt-4">
      <Card tag="a" className="clickable">
        <div className="image-div">
          <img className="event-images" src={"images/" + event.image} alt={"an image for " + event.title} />
        </div>
        <CardBody>
          <CardTitle tag="h3" className="text-center">{event.title}</CardTitle>
          <CardText className="text-center">{"Hosted by: " + event.hostedBy}</CardText>
          <CardText >{(event.description).substring(0,200) +"..."} </CardText>
          <CardLink href="">Click to learn more!</CardLink>
        </CardBody>
      </Card>

    </Col>
  )
}

