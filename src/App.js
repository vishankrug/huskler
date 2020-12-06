import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {EventsList, EventCard} from './Events.js'
import {Container, Row, Col} from 'reactstrap'



function App(props) {
  const events = props.events;
  return (
    <div>
      <navbar>
        
      </navbar>

      <main>
        <div className="container">
          <EventsList events={events}></EventsList>
        </div>
      </main>

      <footer>


      </footer>

    </div>
 
  );
}

export default App;
