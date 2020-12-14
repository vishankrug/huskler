import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {NavBar, Footer, MainBar} from './Navigation.js'
import {EventsList, EventSubmission, EventPage} from './Events.js'
import {Container, Row, Col} from 'reactstrap'
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import {PeopleList, PeopleDetails} from './People.js'
import { SearchBarPage, SearchBarEvent } from './search.js'


function App(props) {

  const events = props.events;
  const people = props.people;

  const [nameState, setNameSearch] = useState('');

  const [majorState, setMajorSearch] = useState('');

  const [interestsState, setInterestsSearch] = useState('');

  const [eventNameState, setEventNameSearch] = useState('');

  const [hostedByState, setHostedBySearch] = useState('');

  const [interested, setInterested] = useState(events);

  let filteredEvents = events.filter((event) => {
    return (event.title.toLowerCase().indexOf(eventNameState.toLowerCase()) !== -1);
  });

  if(hostedByState !== ''){
    filteredEvents = events.filter((event) => {
      return (event.hostedBy.toLowerCase().indexOf(hostedByState.toLowerCase()) !== -1);
    })
  }

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

  const handleClick = (eventName) => {
    const transmuted = events.map((event) => {
      if(events.name === eventName){
        event.isInterested = !event.isInterested;
      }
      return event;
    })
    setInterested(transmuted);
  }

  const updateEventNameSearch = (event) => {
    setEventNameSearch(event.target.value);
  }

  const updateHostedBySearch = (event) => {
    setHostedBySearch(event.target.value);
  }

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

  const clearEvents = () => {
    setEventNameSearch('');
    setHostedBySearch('');
  }

  return (
    <div>
      <nav>
       <NavBar />
       
      </nav>


      <main>
        

        <div className="container">
          <div className="search-bar">
          <Route exact path="/people" render={() => (
            <SearchBarPage updateNameSearch={updateNameSearch} nameState={nameState} updateMajorSearch={updateMajorSearch} majorState={majorState} interestsState={interestsState} updateInterestsSearch={updateInterestsSearch} clearPeople={clearPeople} ></SearchBarPage>
          )} />
          <Route exact path="/" render={() => (
            <SearchBarEvent updateEventNameSearch={updateEventNameSearch} eventNameState={eventNameState} updateHostedBySearch={updateHostedBySearch} hostedByState={hostedByState} clearEvents={clearEvents}></SearchBarEvent>
          )} />
          </div>
          <Switch>
            
          <Route exact path="/people" render={(routerProps) => (
           <PeopleList {...routerProps} people={filteredPeople}></PeopleList>
          )} />

         <Route exact path="/" render={(routerProps) => (
          <EventsList {...routerProps} events={filteredEvents} interestedCallback={handleClick}></EventsList>
         )} />
         

         <Route path="/submit-events" component={EventSubmission} />
         <Route path="/event/:eventName" component={EventPage} />

         <Route path="/people/:fullname" component={PeopleDetails}/>
         <Redirect to="/" />
       </Switch>
        
          
        </div>
      </main>

      <footer>
        <Footer />
      </footer>

    </div>
 
  );
}

export default App;
