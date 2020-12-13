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
          <Route exact path="/people" render={() => (
            <SearchBarPage></SearchBarPage>
          )} />
          <Route exact path="/" render={() => (
            <SearchBarEvent></SearchBarEvent>
          )} />
          </div>
          <Switch>
            
          <Route exact path="/people" render={(routerProps) => (
           <PeopleList {...routerProps} people={people}></PeopleList>
          )} />

         <Route exact path="/" render={(routerProps) => (
          <EventsList {...routerProps} events={events} interestedCallback={handleClick}></EventsList>
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
