import React from 'react';
import './App.css';
import { Switch, Route, Link, Redirect, NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';


export function SearchBarEvent(){

    return(
        <div className="search-bar row">
            <p>Event Name: </p>
            <p>Hosted By: </p>
            <Button className= "submit" color="primary">Submit!</Button>        
        </div>
    )
}


export function SearchBarPage(){
    
    return(
      
      <div className="search-bar row">
        <p>First Name: </p>
        <p>Last Name: </p>
        <p>Major: </p>
        <p>Class Standing: </p>
        <p>Interests: </p>
        <div className= "submit">
        <Button color="primary">Submit!</Button> 
        </div>     
      </div>
  
    )
  }
