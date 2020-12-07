import React from 'react';
import './App.css';
import { Switch, Route, Link, Redirect, NavLink } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHome, faUsers } from '@fortawesome/free-solid-svg-icons';


export function NavBar(){
  let homeIcon= <FontAwesomeIcon icon={faHome}/>;
  let peopleIcon = <FontAwesomeIcon icon={faUsers}/>;
  return(
    
    <div className="navbar-flex">
      <div className="navbar-child-a mx-2">
        <NavLink className="navbar-navlink" exact to="/">huskler</NavLink>
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
      <NavLink className="navbar-navlink" exact to="/">log in</NavLink>
      </div>
    </div>

  )
}