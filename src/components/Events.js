import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import {Card, CardText, CardBody, CardFooter, CardLink, CardTitle, Col, Row} from 'reactstrap';
import {Redirect, useParams} from 'react-router-dom';
import { BackButton, SubmitEventButton } from './Buttons.js';
import { Button } from 'reactstrap';
import { SearchBarEvent } from './Search.js';
import firebase from 'firebase';



export function EventsMainPage(){
  let content ='';
  
  if(firebase.database().ref("events") === null ){
    content = 
      <div>
        <SubmitEventButton />
        <div className="mt-5">
          <h2>There are currently no events at this time. Please check again later!</h2>;
        </div>
      </div>
     

    
  }else{
   content = <EventsList />;
  }

  return(
   content
  )
}

export function EventsList(){

 

  //let events = props.events;



  const [eventNameState, setEventNameSearch] = useState('');
  const [hostedByState, setHostedBySearch] = useState('');
  const [eventsArray, setEvents] = useState([]); //array
  const [interestedEventsFull, setInterested] = useState(eventsArray);


  //console.log(firebase.database().ref("events"));

  ///// Gets all data from firebase /////
  
  useEffect(() => {
    const eventRef = firebase.database().ref("events");
    if(eventRef === null){
      console.log("There's nothing here");
    }else{
      eventRef.on("value", (snapshot) => {
        const eventsObject = snapshot.val() //converts to JS value
        let objectKeyArray = Object.keys(eventsObject);
        let eventsArray = objectKeyArray.map((key) => {
          let singleEventObject = eventsObject[key];
          singleEventObject.key = key;
          
  
          return singleEventObject;
        })
        setEvents(eventsArray);
        setInterested(eventsArray);
      })
    }
    
  }, [])

  
  

  console.log(interestedEventsFull);

  ///// Handle interested /////
  const handleInterestedClick = (eventTitle) => {

    
  
    const interestedEvents = eventsArray.map((event) => {
      //console.log("Props Title: " + event.title);
      //console.log("Event Title: " + eventTitle)
      console.log(typeof event.key);
      if(event.title === eventTitle){
        const ref = firebase.database().ref("events").child(event.key);
        ref.update({isInterested: !event.isInterested})
        event.isInterested = !event.isInterested;
      }
      return event;
    })
    
    setInterested(interestedEvents);
  }

 
  ////// Search function /////
  let filteredEvents = interestedEventsFull.filter((event) => {
    return (event.title.toLowerCase().indexOf(eventNameState.toLowerCase()) !== -1);
  });

  if(hostedByState !== ''){
    filteredEvents = interestedEventsFull.filter((event) => {
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

  let eventCards = filteredEvents.map((eventsArray) => {
    return <EventCard key={eventsArray.title} event={eventsArray} adoptInterestedCallback={() => handleInterestedClick(eventsArray.title)} />
  })
 
  ///// Return /////
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

//////// EVENT CARD /////////
export function EventCard(props) {
  let interestedCallback = props.adoptInterestedCallback;
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
      <Card>
        <div className="image-div">
          <img className="event-images" src={event.image} alt={"an image for " + event.title} />
        </div>
        <CardBody className="clickable" onClick={() => handleClick(event.name) }>

          <CardTitle tag="h3" className="text-center">
            {event.title}
          </CardTitle>
          <CardText className="text-center">
            {"Hosted by: " + event.hostedBy}
          </CardText>
          <CardText >
            {(event.description).substring(0,200) +"..."} 
          </CardText>
          <CardLink href="">Click to learn more!</CardLink>

        </CardBody>
        <CardFooter> 
          <Button onClick={() => interestedCallback(event.name)}>Interested</Button>
          <p> {event.isInterested ? "You are interested in this event!" : "no" }</p>
        </CardFooter>
      </Card>

    </Col>
  )
}

////// EVENT PAGE /////
export function EventsIndividualPage(){
  
  const [eventsArray, setEvents] = useState([]); //array
  useEffect(() => {
    const eventRef = firebase.database().ref("events");
    eventRef.on("value", (snapshot) => {
      const eventsObject = snapshot.val() //converts to JS value
      let objectKeyArray = Object.keys(eventsObject);
      let eventsArray = objectKeyArray.map((key) => {
        let singleEventObject = eventsObject[key];
        singleEventObject.key = key;
        return singleEventObject;
      })
      setEvents(eventsArray);
    })
  }, [])

  
  let eventName = useParams().eventName;
  let event = _.find(eventsArray, {title:eventName});
 
  if(!event){
    return <h2>No event that matches</h2>
  }

  return(
    <div>
      <img src={"../images/" + event.image} alt={"an image of " + event.title} className="event-images-lg mt-5" />
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


