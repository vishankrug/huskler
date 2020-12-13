import React from 'react';
import './App.css';
import { Button } from 'reactstrap';
import { useState } from 'react';


export function SearchBarEvent(){

    

    return(
        <form className="form">
            Event Name: <input type="text" name="event-name" />
            Hosted By: <input type="text" name="hosted-by" />
            <Button className="button" color="primary">Submit!</Button>
        </form>
    )
}


export function SearchBarPage(){

    const [nameState, setNameSearch] = useState('John Doe');

    const [majorState, setMajorSearch] = useState('Informatics');

    const [interestsState, setInterestsSearch] = useState('Cycling');

    const updateNameSearch = (event) => {
        console.log(event.target.value);
        setNameSearch(event.target.value);
    }

    const updateMajorSearch = (event) => {
        console.log(event.target.value);
        setMajorSearch(event.target.value);
    }

    const updateInterestsSearch = (event) => {
        console.log(event.target.value);
        setInterestsSearch(event.target.value);
    }

    return(

    <form className="form">
        Name: <input type="text" name="name" value={nameState} onChange={updateNameSearch.bind()}/>
        Major: <input type="text" name="major" value={majorState} onChange={updateMajorSearch.bind()}/>
        Interest: <input type="text" name="interests" value={interestsState} onChange={updateInterestsSearch.bind()}/>
        <Button className="button"color="primary">Submit!</Button>
    </form>
    )
  }
