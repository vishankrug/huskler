import React, {useState, useEffect} from 'react';
import './CSS/App.css';
import {NavBar, Footer} from './components/Navigation.js'
import {EventsList, EventSubmission, EventPage} from './components/Events.js'
import {Container} from 'reactstrap'
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import {PeopleList, PeopleDetails, PeoplePopUp} from './components/People.js'
import { SearchBarPage, SearchBarEvent } from './components/Search.js';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { SubmitEventButton } from './components/Buttons';
import { LandingPage } from './components/LandingPage';


const uiConfig = {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  credentialHelper: 'none',
  signInFlow: 'popup',
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },

};

function App(props) {

  const events = props.events;
  const people = props.people;

  // Search bar states
  const [eventNameState, setEventNameSearch] = useState('');
  const [hostedByState, setHostedBySearch] = useState('');

  // Firebase state

  const[user, setUser] = useState(undefined);
  const [interested, setInterested] = useState(events);
  const [isLoading, setIsLoading] = useState(true);

 


  const handleClick = (eventName) => {
    const transmuted = events.map((event) => {
      if(events.name === eventName){
        event.isInterested = !event.isInterested;
      }
      return event;
    })
    setInterested(transmuted);
  }

  

  //sa
  //auth state event listener
  useEffect( () => { //run after component loads
    //listen to the the authentication state
    const authUnregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) =>{
      if(firebaseUser){
        console.log("logged in as: " + firebaseUser.displayName)
        setUser(firebaseUser)
        setIsLoading(false);
      }else{ //not defined, logged out
        setUser(null)
      }
    })

    return function cleanup() {
      authUnregisterFunction();
    }
  }, []) //only run hook on first load

  /*if(isLoading){
    return(
    <div className="text-center">
      <i className="fa fa-spinner fa-spin fa-3x"></i>
    </div>
    ) 
  }*/

  
  let content = null;

  //Log in page
  if(!user){
    content = (
      <LandingPage uiConfig={uiConfig} />
      
    )

  // Home page + rest of page
  }else{
    content =(
      <div>
        <nav>
          <NavBar />
        
        </nav>

        <main>
          

          <div className="container">
            <Switch>
              
            <Route exact path="/people" render={(routerProps) => (
            <PeopleList {...routerProps} user={user} people={people}></PeopleList>
            )} />

          <Route exact path="/" render={(routerProps) => (
            <EventsList {...routerProps} events={events} interestedCallback={handleClick}></EventsList>
          )} />

          
          <Route path="/submit-event" render={() => (
            <EventSubmission />
          )}/>

          <Route path="/event/:eventName" render={(routerProps) => (
            <EventPage {...routerProps} events={events}></EventPage>
          )}/>

          <Route path="/people-edit" render={() => (
            <PeoplePopUp user={user} people={people}></PeoplePopUp>
          )}/>

          <Route path="/people/:fullname" render={(routerProps) => (
            <PeopleDetails {...routerProps} people={people}></PeopleDetails>
          )}/>

          <Redirect to="/" />
        </Switch>
          
            
          </div>
        </main>

        <footer>
          <Footer />
        </footer>

    </div>
 

    )
  }
  return (
   content
  );
}

export default App;
