import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import {Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import firebase from 'firebase/app';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '../CSS/App.css'




export function BackButton(props){
  const [redirectTo, setRedirectTo] = useState(undefined);

  if(redirectTo !== undefined){
    return <Redirect push to={redirectTo} />
  }

  const handleClick = () => {
    setRedirectTo(props.page);
  }

  return(
    <Button color="secondary" className="ml-3" onClick={handleClick}>Back</Button>
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

