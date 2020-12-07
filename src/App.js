import React from 'react';
import './App.css';
import {NavBar} from './Navigation.js'
import {EventsList, EventSubmission} from './Events.js'
import {PeopleList} from './people.js'
import { Route, Switch, Redirect } from 'react-router-dom'
import { SearchBarPage, SearchBarEvent } from './search.js'
import PeopleDetails from './PeopleDetails';




function App(props) {
  const events = props.events;
  const people = props.people.results;
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
          <EventsList {...routerProps} events={events}></EventsList>
         )} />
         <Route path="/submit-events" component={EventSubmission} />
         <Route path="/people" render={(routerProps) => (
           <PeopleList {...routerProps} people={people}></PeopleList>
         )} />
         <Route path="/people/:people" component={ PeopleDetails }/>
         <Redirect to="/" />
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
