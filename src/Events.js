import React from 'react';
import {Card, CardText, CardBody,CardLink, CardTitle, Col, Row} from 'reactstrap';
import {Formik, setNestedObjectValues} from 'formik';

export function EventsList(props){
  let events = props.events;
  let eventCards = events.map((event) => {
    return <EventCard key= {event.title} event={event} />
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
      <Card className="clickable">
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

export function EventSubmission(props){
  
  return(
    <div>
      
      <main>
        <h1>Submit an event</h1>
       <Formik  initialValues={{title: '', hostedBy: '', date: '', location: '', description: '', image: '',}} 
       
       >
        {({

            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */

          }) => (
          <form onSubmit={handleSubmit}>
            <input 
              type="title"
              name="title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={setNestedObjectValues.title}
            />
            <button type="submit" >
              Submit
            </button>
            
          </form>
       )}
    
       </Formik>
      </main>

    </div>
 
    
  )
}

