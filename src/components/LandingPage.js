import React from 'react';
import {UncontrolledCarousel, Container} from 'reactstrap'


export function LandingPage (props){

  return(
    <div style={{ 
      backgroundImage: "url(images/signup-page-background.jpg)", 
      backgroundSize: "cover",
      backgroundPosition: "center bottom",
      height: "60vh",
      border: "1px solid black",
      }}>
      <Container>
        <StyledFirebaseAuth uiConfig={props.uiConfig} firebaseAuth={firebase.auth()} />
      </Container>
    </div>
  )
}


function LandingPageCarousel(){
  const items = [
    {
      src: '../images/lux.png',
      altText: 'event by LUX',
    },
    {
      src: '../images/quest-facor.jpg',
      altText: 'event by Sam',
    }
  ];

  return(
    <UncontrolledCarousel items={items}/>
  )
}