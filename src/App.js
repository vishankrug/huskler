import React, {useState, useEffect} from 'react';
import './CSS/App.css';
import {NavBar, Footer} from './components/Navigation.js'
import {EventsIndividualPage, EventsMainPage} from './components/Events.js'
import { Route, Switch, Redirect} from 'react-router-dom';
import {PeopleList, PeopleDetails} from './components/People.js'
import firebase from 'firebase';
import { LandingPage } from './components/LandingPage.js';
import {EventSubmission, EditProfile} from './components/SubmissionPages.js';


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


  // Firebase state

  const[user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
 
  
  //auth state event listener
  useEffect( () => { //run after component loads
    //listen to the the authentication state
    const authUnregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) =>{
      if(firebaseUser){
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

  const [eventsArray, setEvents] = useState([]); //array
  const [peopleArray, setPeople] = useState([]);
  //const [interestedEventsFull, setInterested] = useState(eventsArray);
  const [peopleEmails, setEmails] = useState([])
  

  /////  Gets all data from firebase /////
  useEffect(() => {
    const peopleRef = firebase.database().ref("people");
    const eventRef = firebase.database().ref("events");
    peopleRef.on("value", (snapshot) => {
      const peopleObjects = snapshot.val();
      let peopleKeyArray = Object.keys(peopleObjects);
      let peopleArray = peopleKeyArray.map((key) => {
        let singlePeopleObject = peopleObjects[key];
        singlePeopleObject.key = key;
        
        return singlePeopleObject;
      })
      let peopleEmails = peopleArray.map((key) => {
        return key.email;
      })
      setPeople(peopleArray);
      setEmails(peopleEmails);
    })

    eventRef.on("value", (snapshot) => {
      const eventsObject = snapshot.val() //converts to JS value
      let objectKeyArray = Object.keys(eventsObject);
      let array = objectKeyArray.map((key) => {
        let singleEventObject = eventsObject[key];
        singleEventObject.key = key;
        

        return singleEventObject;
      })
      
      setEvents(array);
      //setInterested(eventsArray);
    })

  }, [])

  console.log(eventsArray);

    ///// EVENTS: Gets all data from firebase /////
  
   

    

    ///// Handle interested /////
  function handleInterestedClick (eventTitle)  {
    
    let user = firebase.auth().currentUser;
    



    const interestedEvents = eventsArray.map((event) => {
      //console.log("Props Title: " + event.title);
      //console.log("Event Title: " + eventTitle);
      //console.log(typeof event.key);
      if(event.title === eventTitle){
        const ref = firebase.database().ref("events").child(event.key);
        ref.update({isInterested: !event.isInterested})
        event.isInterested = !event.isInterested;
      }
      return event;
    })
    
    //setInterested(interestedEvents);
  }

  //console.log(interestedEventsFull);
  
  
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
              <PeopleList {...routerProps} user={user} peopleArray={peopleArray} ></PeopleList>
              )} />

              <Route exact path="/" render={(routerProps) => (
              <EventsMainPage {...routerProps} events={eventsArray} adoptHandleInterestedClick={handleInterestedClick}  ></EventsMainPage>
            )} />

              <Route path="/submit-event" render={() => (
              <EventSubmission />
              )}/>

              <Route path="/event/:eventName" render={(routerProps) => (
              <EventsIndividualPage {...routerProps} ></EventsIndividualPage>
              )}/>

              <Route path="/people-edit" render={() => (
              <EditProfile user={user} peopleArray={peopleArray}></EditProfile>
              )}/>

              <Route path="/people/:fullname" render={(routerProps) => (
              <PeopleDetails {...routerProps} peopleArray={peopleArray}></PeopleDetails>
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
