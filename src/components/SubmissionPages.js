import React from 'react';
import {EventsSubmissionForm, PeopleForm} from './Forms'
export function EventSubmission(){

  return(
    <main>
      <div className="d-flex justify-content-center mt-5">
        <h1>SUBMIT AN EVENT</h1>
      </div>
  
      <EventsSubmissionForm />
    
      
  
    </main>
  )
  
}

export function EditProfile(props){
  console.log(props.peopleArray);
  return(
    <main>
      <div className="d-flex justify-content-center mt-5">
        <h1>EDIT PROFILE</h1>
      </div>

      <PeopleForm user={props.user} peopleArray={props.peopleArray} />
      
     
  
    </main>
  )
   
}