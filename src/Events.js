import React, {useState} from 'react';
import _ from 'lodash';
import {Card, CardText, CardBody,CardLink, CardTitle, Col, Row} from 'reactstrap';
import {useFormik, setNestedObjectValues} from 'formik';
import {Redirect, useParams} from 'react-router-dom';
import sample_events from './events.json';
import { BackButton } from './components/Buttons.js';
import { Button } from 'reactstrap';

export function EventsList(props){
  let interestedCallback = props.interestedCallback;
  let events = props.events;
  let eventCards = events.map((event) => {
    return <EventCard key={events.title} event={event} interestedCallback = {interestedCallback} />
  })
   
  return(
    <Row>
      {eventCards}
    </Row>

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

  let event = _.find(sample_events, {title:eventName});
 
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
      <BackButton page="/" />
    </div>
  )
}

export function EventSubmission(props){
  
  const  formik = useFormik({
    initialValues: {
      title: '', 
      hostedBy: '', 
      date: '', 
      location: '', 
      description: '', 
      image: ''
    }
  });
  return(
    <div>
      
      <main>
        <h1 className="text-center">Submit an event</h1>

        <form onSubmit={formik.handleSubmit}>
          <label>Title of event</label> <br></br>
          <input 
                type="title"
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={setNestedObjectValues.title}
          /> <br></br>

          <label>Hosted By</label> <br></br>
          <input 
                type="title"
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={setNestedObjectValues.title}
          /> <br></br>

          <label>Date</label> <br></br>
          <input 
                type="title"
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={setNestedObjectValues.title}
          /> <br></br>

          <label>Location</label> <br></br>
          <input 
                type="title"
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={setNestedObjectValues.title}
          /> <br></br>

          <label>Description</label> <br></br>
          <input 
                type="title"
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={setNestedObjectValues.title}
          /> <br></br>

          <label>Image</label> <br></br>
          <input 
                type="title"
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={setNestedObjectValues.title}
          /> <br></br>
        </form>
       
      
      </main>

    </div>
 
    
  )
}

