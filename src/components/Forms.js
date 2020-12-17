import React, {useState} from 'react';
import {Formik, Form, Field} from 'formik';
import firebase from 'firebase';

import 'firebase/database';
import 'firebase/auth';
import {Button} from 'reactstrap';
import {BackButton} from './Buttons'
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
//import { DatePicker } from 'react-datepicker';
//import FileUploader from 'react-firebase-file-uploader';



export function EventsSubmissionForm(){
  
  /* A huge thank you to Tallan Groberg, Code from https://dev.to/itnext/how-to-do-image-upload-with-firebase-in-react-cpj */

  const allInputs = {imgUrl: ""};
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [imageAsFile, setImageAsFile] = useState('');

  const initialValues = {
    titlea: '', 
    hostedBy: '', 
    time:'',
    date: '', 
    location: '', 
    description: '', 
    image: '',
    isInterested: '',
  }

  const handleImageAsFile = (event) => {
    const img = event.target.files[0];
    setImageAsFile((img))
    
  }

  const onSubmit = (values) =>{
    let databaseRef = firebase.database().ref('events');
    let uploadTask = firebase.storage().ref(`/image/${imageAsFile.name}`).put(imageAsFile);
   

    databaseRef.push(
      {
        title: values.title,
        hostedBy: values.hostedBy,
        time: values.time,
        date: values.date,
        location: values.location,
        description: values.description,
        image: imageAsFile.name,
        isInterested: false,
        
      }
    );

    uploadTask.on("state_change",
    (snapshot) => {
      console.log(snapshot)
    }, (err) => {
      console.log(err)
    }, () => {
      firebase.storage().ref("images").child(imageAsFile.name).getDownloadURL().then(fireBaseUrl => {
        setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
      })
    })

  }


  return(
    <Formik {...{initialValues, onSubmit}}>
      {() => (
        <Form className="baseForm" noValidate>
          
          <label className="mt-4">Title of event</label> <br></br>
          <Field 
            type="text"
            id="title"
            name="title"
            /> <br></br>

          <label className="mt-4">Hosted by</label> <br></br>
          <Field 
            type="text"
            id="hostedBy"
            name="hostedBy"
            /> <br></br>

          <label className="mt-4">Date</label> <br></br>
          <Field
            type="date"
            id="date"
            name="date"
            /> <br></br>

          <label className="mt-4">Time</label> <br></br>
          <Field 
            type="time"
            id="time"
            name="time"
            /> <br></br>

          <label className="mt-4">Location</label> <br></br>
          <Field 
            type="text"
            id="location"
            name="location"
            /> <br></br>

          <label className="mt-4">Description</label> <br></br>
          <Field 
            type="textarea"
            id="description"
            name="description"
            /> <br></br>

          <label className="mt-4">Upload an image</label> <br></br>
          <input type="file" id="image" name="image" onChange={handleImageAsFile}/><br></br>
         
          
          <Button type="submit" className="mt-5">Submit</Button>

        </Form>
      )}
    </Formik>
  )
}


export function PeopleForm(){
  let user = firebase.auth().currentUser;
  //let peopleRef = firebase.database.ref("people");

  let fnameUpdate = user.displayName.substr(0, user.displayName.indexOf(' '));
  let lnameUpdate = user.displayName.substr(user.displayName.indexOf(' ')+1, user.displayName.length);

  const initialValues = {
    fname: fnameUpdate, 
    lname: lnameUpdate,
    major: "",
    interest: "",
    year: "",
    email: user.email,
    bio: ""
  }

  const handleSubmit = (values) => {
    let databasePeopleRef = firebase.database().ref('people');
    databasePeopleRef.push(
      {
        displayName: user.displayName,
        fname: values.fname,
        lname: values.lname,
        major: values.major,
        interest: values.interest,
        year: values.year,
        email: user.email,
        bio: values.bio,
      }
    );
  }  

  const allInputs = {imgUrl: ""};
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [imageAsFile, setImageAsFile] = useState('');

  const handleImageAsFile = (event) => {
    const img = event.target.files[0];
    setImageAsFile((img))
    
  }


  return(
    <Formik {...{initialValues, handleSubmit}}>
    {() => (
      <Form className="baseForm" noValidate>
        
        <label className="mt-4">Display Name</label> <br></br>
        <Field 
          type="text"
          id="displayName"
          name="displayName"
          /> <br></br>

      <label className="mt-4">First Name</label> <br></br>
        <Field 
          type="text"
          id="fname"
          name="fname"
          /> <br></br>

      <label className="mt-4">Last Name</label> <br></br>
        <Field 
          type="text"
          id="lname"
          name="lname"
          /> <br></br>

        <label className="mt-4">Major</label> <br></br>
        <Field 
          type="text"
          id="major"
          name="major"
          /> <br></br>

        <label className="mt-4">Class Standing</label> <br></br>
        <Field
          type="text"
          id="year"
          name="year"
          /> <br></br>

        <label className="mt-4">Interest</label> <br></br>
        <Field 
          type="text"
          id="interest"
          name="interest"
          /> <br></br>

        <label className="mt-4">Email</label> <br></br>
        <Field 
          type="text"
          id="email"
          name="email"
          /> <br></br>

        <label className="mt-4">Bio</label> <br></br>
        <textarea
          id="location"
          name="location"
          rows="4"
          cols="50"
          /> <br></br>

        <label className="mt-4">Upload an image</label> <br></br>
          <input type="file" id="image" name="image" onChange={handleImageAsFile}/><br></br>

        <Button type="submit">Submit</Button>
        <BackButton/>
      </Form>
    )}
  </Formik>
  )
}