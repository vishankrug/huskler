import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {NavBar, Footer, MainBar} from './Navigation.js'
import {EventsList, EventSubmission, EventPage} from './Events.js'
import {Container, Row, Col} from 'reactstrap'
import { Route, Switch, Redirect, Link } from 'react-router-dom';



function App(props) {

  const events = props.events;
  return (
    <div>
      <nav>
       <NavBar />
       
      </nav>

      <main>
        

        <div className="container">
        <Switch>
         <Route exact path="/" render={(routerProps) => (
          <EventsList {...routerProps} events={events}></EventsList>
         )} />
         <Route path="/submit-events" component={EventSubmission} />
         <Route path="/event/:eventName" component={EventPage} />
  
         
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
