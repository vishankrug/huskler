import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {NavBar} from './Navigation.js'
import {EventsList, EventSubmission} from './Events.js'
import {Container, Row, Col} from 'reactstrap'
import { Route, Switch, Redirect } from 'react-router-dom';



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
         <Redirect to="/" />
       </Switch>
          
        </div>
      </main>

      <footer>


      </footer>

    </div>
 
  );
}

export default App;
