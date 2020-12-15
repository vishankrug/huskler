import React, {useState} from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
import {Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import firebase from 'firebase/app';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '../CSS/App.css'
import { EventSubmission } from './Events';




export function BackButton(props){


  return(
    <Link to={props.page}>
      <Button color="secondary" className="ml-3">Back</Button>
    </Link>
    
  )

}

export function SubmitEventButton(){

  return(
    <div className="d-flex justify-content-end">
      <Link to="/submit-event">
        <Button className="mt-4 " >Submit Event</Button>
      </Link>
    </div>
    
    
  )

}

export function LogOutButton(){
  const handleLogOut = () => {
    firebase.auth().signOut()
  }

  return(
    <DropdownItem onClick={handleLogOut} className="clickable">Log Out</DropdownItem>
  )
}

export function EditProfileButton(){
  const handleProfilePageRedirect = () => {

  }

  return(
    <DropdownItem onClick={handleProfilePageRedirect} className="clickable">Edit Profile</DropdownItem>
  )
}

export function UserMenuButton(){
  let userIcon= <FontAwesomeIcon icon={faUser}/>;
  const[dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => {
    setDropdownOpen(prevState => !prevState);
  }

  return(
    <Dropdown isOpen={dropdownOpen} toggle={toggle} >
      <DropdownToggle className="navbar-navlink bg-secondary">
        {userIcon}
      </DropdownToggle>
      <DropdownMenu right>
        <EditProfileButton />
        <LogOutButton />
    
      </DropdownMenu>
    </Dropdown>
  )
}

