import React from 'react';
import './App.css';
import { Switch, Route, Link, Redirect, NavLink } from 'react-router-dom';
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
            First Name: <input type="text" name="first-name" />
        </label>
        <label className="form-child">
            Last Name: <input type="text" name="last-name" />
        </label>
        <label className="form-child">
            Major: <input type="text" name="major" />
        </label>
        <label className="form-child">
            Class Standing: <input type="text" name="year" />
        </label>
        <label className="form-child">
            Interests: <input type="text" name="interests" />
        </label>
        <label className="form-child">
            Email: <input type="text" name="email" />
        </label>
        <Button className="button"color="primary">Submit!</Button>
    </form>

      

    )
  }
