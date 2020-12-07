import React from 'react';
import _ from 'lodash';
import { useParams } from "react-router-dom";
import SAMPLE_PEOPLE from './People.json'


export default function PeopleDetails(props){
    let {personName} = useParams().personName;
    let person =  _.find(SAMPLE_PEOPLE, {fname:personName});

    if(!person) return <h2>No person specified</h2>

    return(
        <div>
            <h2>SUP {person.name}</h2>
        </div>
    )


  }

