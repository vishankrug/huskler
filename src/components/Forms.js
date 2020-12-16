import React, {useState} from 'react';
import {Formik, Form, Field} from 'formik';
import firebase from 'firebase/app';
import 'firebase/database';
import {Button} from 'reactstrap';
import {BackButton} from './Buttons'

export function EventsSubmissionForm(){
  const [file, setFile] = useState(null);

  const initialValues = {
    titlea: '', 
    hostedBy: '', 
    time:'',
    date: '', 
    location: '', 
    description: '', 
    image: '',
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    
  }

  const onSubmit = (values) =>{
    let databaseRef = firebase.database().ref('events');
    databaseRef.update(file);
    console.log(file.name);
    console.log(file);
    databaseRef.push(
      {
        title: values.title,
        hostedBy: values.hostedBy,
        time: values.time,
        date: values.date,
        location: values.location,
        description: values.description,
        image: file.name
      }
    );
    
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
          <input type="file" id="image" name="image" onChange={handleFileChange}/><br></br>
          
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