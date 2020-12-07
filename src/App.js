import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {NavBar, Footer, MainBar} from './Navigation.js'
import {EventsList, EventSubmission, EventPage} from './Events.js'
import {Container, Row, Col} from 'reactstrap'
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import {PeopleList} from './People.js'
import { SearchBarPage, SearchBarEvent } from './Search.js'
import PeopleDetails from './PeopleDetails';




function App(props) {

  const events = props.events;
  const people = props.people.results;

  const [interested, setInterested] = useState(events)

  const handleClick = (eventName) => {
    const transmuted = events.map((event) => {
      if(events.name === eventName){
        event.isInterested = !event.isInterested;
      }
      return event;
    })
    setInterested(transmuted);
  }

  return (
    <div>
      <nav>
       <NavBar />
       
      </nav>


      <main>
        

        <div className="container">
          <div className="search-bar">
          <Route path="/people" render={() => (
            <SearchBarPage></SearchBarPage>
          )} />
          <Route exact path="/" render={() => (
            <SearchBarEvent></SearchBarEvent>
          )} />
          </div>
          <Switch>
         <Route exact path="/" render={(routerProps) => (
          <EventsList {...routerProps} events={events} interestedCallback={handleClick}></EventsList>
         )} />
         <Route path="/submit-events" component={EventSubmission} />
         <Route path="/event/:eventName" component={EventPage} />
  
         
         <Route path="/people" render={(routerProps) => (
           <PeopleList {...routerProps} people={people}></PeopleList>
         )} />
         <Route path="/people/:people" component={ PeopleDetails }/>
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
