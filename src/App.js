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

  const [peopleArray, setPeople] = useState([]);
  const [peopleEmails, setEmails] = useState([])

  useEffect(() => {
    const peopleRef = firebase.database().ref("people");
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
  }, [])
  console.log(peopleArray)
  
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
              <EventsMainPage {...routerProps}  ></EventsMainPage>
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
