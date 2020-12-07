import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {NavBar} from './Navigation.js'
import {EventsList, EventCard} from './Events.js'
import {PeopleList} from './people.js'
import {Container, Row, Col} from 'reactstrap'
import { Route, Switch, Link, Redirect, NavLink } from 'react-router-dom';




function App(props) {
  const events = props.events;
  const people = props.people;
  let eventPage = <EventsList events={events}></EventsList>
  return (
    <div>
      <nav>
       <NavBar></NavBar>
      </nav>

      <main>
        <div className="container">
          <Switch>
          <Route exact path="/" return = { eventPage }/>
          <Route exact path="/people" return = { PeopleList }/>
          </Switch>
          
        </div>
      </main>

      <footer>
      <p> Copyright &copy; 2020 Vishank Rughwani and Sam Quiambao. All rights reserved</p>
      </footer>

    </div>
 
  );
}

export default App;
