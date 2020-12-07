import React, {useState} from 'react';
import './App.css';
import { Switch, Route, Link, Redirect, NavLink, useLocation } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHome, faUsers } from '@fortawesome/free-solid-svg-icons';


export function NavBar(){
  let homeIcon= <FontAwesomeIcon icon={faHome}/>;
  let peopleIcon = <FontAwesomeIcon icon={faUsers}/>;
  return(
    
    <div className="navbar-flex">
      <div className="navbar-child-a mx-2">
        <NavLink className="navbar-navlink" exact to="/">UW FRIENDS</NavLink>
      </div>

      <div className="navbar-child-b mx-2">
        <ul className="list-unstyled">
          <li className="navbar-list">
            <NavLink exact to="/" className="navbar-navlink icons">{homeIcon}</NavLink>
          </li>
          <li className="navbar-list">
            <NavLink exact to="/people" className="navbar-navlink icons">{peopleIcon}</NavLink>
          </li>
        </ul> 
      </div>
      <div className="navbar-child-c mx-2">
      <NavLink className="navbar-navlink" exact to="/">LOG IN</NavLink>
      </div>
    </div>

  )
}

export function Footer(){
  return(
    <div className="mt-5">
      <hr></hr>
      <p className="ml-5">Copyright &copy; 2020 Vishank Rughwani and Sam Quiambao. All rights reserved.  </p>
    </div>
  )
}


export function MainBar(props){

  let location = useLocation().pathname;
  console.log(location);
  
  
  if(location === '/submit-events'){
    return(
      <div className="flex-nav-submission-back"><Link exact to="/" className="btn btn-primary">Go back</Link></div>
    )
  }else if(location === '/'){
    return(
      <div className="flex-nav-submission">
        <div>
          <Link to="/submit-events" className="btn btn-primary" >Submit Events</Link>
        </div>
      </div>

    )
    
  }else{
    return(
      <p>You've messed up, buckaroo</p>
    )
  }
}
