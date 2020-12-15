import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import {Button} from 'reactstrap';
import firebase from 'firebase/app';


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
    <Button color="primary" onClick={handleLogOut}/>
  )
}
