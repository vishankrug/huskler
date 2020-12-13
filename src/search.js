import React from 'react';
import './App.css';
import { Button } from 'reactstrap';


export function SearchBarEvent(){

    return(
        <form className="form">
        <label className="form-child">
            Event Name: <input type="text" name="event-name" />
        </label>
        <label className="form-child">
            Hosted By: <input type="text" name="hosted-by" />
        </label>
        <Button className="button" color="primary">Submit!</Button>
    </form>
    )
}


export function SearchBarPage(){
    
    return(

    <form className="form">
        <label className="form-child">
            Name: <input type="text" name="name" />
        </label>
        <label className="form-child">
            Major: <input type="text" name="major" />
        </label>
        <label className="form-child">
            Interest: <input type="text" name="interests" />
        </label>
        <Button className="button"color="primary">Submit!</Button>
    </form>

      

    )
  }
