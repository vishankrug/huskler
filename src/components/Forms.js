import React, {useState} from 'react';
import {Formik, Form, Field} from 'formik';
import firebase from 'firebase';

import 'firebase/database';
import {Button} from 'reactstrap';
import {BackButton} from './Buttons'
import { DatePicker } from 'react-datepicker';
import FileUploader from 'react-firebase-file-uploader';



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
        image: imageAsFile.name
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


   
   
    
    alert(JSON.stringify(values, null, 2));
    
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
  const initialValues = {
    name: "", 
    major: "",
    interest: "",
    year: "",
    email: "",
    bio: ""
  }

  const handleSubmit = (values) => {
    let databasePeopleRef = firebase.database().ref('people');
    databasePeopleRef.push(
      {
        name: values.name,
        major: values.major,
        interest: values.interest,
        year: values.year,
        bio: values.bio,

      }
    );
  }  


  return(
    <Formik {...{initialValues, handleSubmit}}>
    {() => (
      <Form className="baseForm" noValidate>
        
        <label className="mt-4">Name</label> <br></br>
        <Field 
          type="text"
          id="title"
          name="title"
          /> <br></br>

        <label className="mt-4">Major</label> <br></br>
        <Field 
          type="text"
          id="hostedBy"
          name="hostedBy"
          /> <br></br>

        <label className="mt-4">Year</label> <br></br>
        <Field
          type="text"
          id="date"
          name="date"
          /> <br></br>

        <label className="mt-4">Interest</label> <br></br>
        <Field 
          type="text"
          id="time"
          name="time"
          /> <br></br>

        <label className="mt-4">Bio</label> <br></br>
        <textarea
          id="location"
          name="location"
          rows="4"
          cols="50"
          /> <br></br>

        <Button type="submit">Submit</Button>
        <BackButton/>
      </Form>
    )}
  </Formik>
  )
}