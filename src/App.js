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
  const [nameState, setNameSearch] = useState('');
  const [majorState, setMajorSearch] = useState('');
  const [interestsState, setInterestsSearch] = useState('');
  const [eventNameState, setEventNameSearch] = useState('');
  const [hostedByState, setHostedBySearch] = useState('');

  // Firebase state

  const[user, setUser] = useState(undefined);
  const [interested, setInterested] = useState(events);
  const [isLoading, setIsLoading] = useState(true);

  // Search bar code

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

  if(isLoading){
    return(
    <div className="text-center">
      <i className="fa fa-spinner fa-spin fa-3x"></i>
    </div>
    ) 
  }

  
  let content = null;

  if(!user){
    content = (
      <Container>
        <h1>Sign Up</h1>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </Container>
    )
  }else{
    content =(
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
            <PeopleList {...routerProps} user={user} people={filteredPeople}></PeopleList>
            )} />

          <Route exact path="/" render={(routerProps) => (
            <EventsList {...routerProps} events={filteredEvents} interestedCallback={handleClick}></EventsList>
          )} />

          
          <Route path="/submit-event" render={() => (
            <EventSubmission />
          )}/>

          <Route path="/event/:eventName" render={(routerProps) => (
            <EventPage {...routerProps} events={events}></EventPage>
          )}/>

          <Route path="/people/edit" render={(routerProps) => (
            <PeoplePopUp {...routerProps} user={user} people={people}></PeoplePopUp>
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
