import React, {useState} from 'react';
import _ from 'lodash';
import {Card, CardText, CardBody,CardLink, CardTitle, Col, Row} from 'reactstrap';
import {Formik, Form, Field} from 'formik';
import {Redirect, useParams} from 'react-router-dom';
import { BackButton, SubmitEventButton } from './Buttons.js';
import { Button } from 'reactstrap';
import { SearchBarEvent } from './Search.js';
import firebase from 'firebase';


export function EventsList(props){
  let interestedCallback = props.interestedCallback;
  let events = props.events;

  const [eventNameState, setEventNameSearch] = useState('');
  const [hostedByState, setHostedBySearch] = useState('');

  let filteredEvents = events.filter((event) => {
    return (event.title.toLowerCase().indexOf(eventNameState.toLowerCase()) !== -1);
  });

  if(hostedByState !== ''){
    filteredEvents = events.filter((event) => {
      return (event.hostedBy.toLowerCase().indexOf(hostedByState.toLowerCase()) !== -1);
    })
  }

  const updateEventNameSearch = (event) => {
    setEventNameSearch(event.target.value);
  }

  const updateHostedBySearch = (event) => {
    setHostedBySearch(event.target.value);
  }

  const clearEvents = () => {
    setEventNameSearch('');
    setHostedBySearch('');
  }



  let eventCards = filteredEvents.map((event) => {
    return <EventCard key={events.title} event={event} interestedCallback = {interestedCallback} />
  })
   
  return(
    <div>
      <div className="search-bar">
        <SearchBarEvent updateEventNameSearch={updateEventNameSearch} eventNameState={eventNameState} updateHostedBySearch={updateHostedBySearch} hostedByState={hostedByState} clearEvents={clearEvents}></SearchBarEvent>
      </div>
      <SubmitEventButton />
      <Row>
        {eventCards}
      </Row>
    </div>
    
  )
}

export function EventCard(props) {
  let interestedCallback = props.interestedCallback;
  let event = props.event;

  const[redirectTo, setRedirectTo] = useState(undefined);

  const handleClick =() => {
    setRedirectTo("/event/" + event.title);
  }

  if(redirectTo !== undefined){
    return <Redirect push to={redirectTo}/>
  }

  return (
    <Col md="6" className="mt-4">
      <Card tag="a" className="clickable" onClick={handleClick}>
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

export function EventPage(props){
  let interestedCallback = props.interestedCallback;
  let eventName = useParams().eventName;
  let event = _.find(props.events, {title:eventName});
 
  if(!event){
    return <h2>No event that matches</h2>
  }




  return(
    <div>
      <img src={"../images/" + event.image} alt={event.title} className="event-images-lg mt-5" />
      <h2>{event.title}</h2>
      <p><strong>Hosted by: </strong>{event.hostedBy}</p>
      <p><strong>Date: </strong>{event.date}</p>
      <p><strong>Time: </strong>{event.time}</p>
      <p><strong>Location: </strong>{event.location}</p>
      <p><strong>Link: </strong><a href={event.locationLink}>{event.locationLink}</a></p>
      <p><strong>Description:</strong> <br></br> {event.description}</p>
      <Button color="primary" className="btn">Interested!</Button>
      <BackButton />
    </div>
  )
}


