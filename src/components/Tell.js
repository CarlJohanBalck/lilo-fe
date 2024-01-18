import React, { useState, useEffect } from 'react';
import '../css/lilo.css';

var config = require('../config');


function Tell() {
  const [status, setStatus] = useState({
    status: false,
    done: false,
    daysSince: 0,
    date: "",
    errorLoading: false
  });


 function print() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: ""
    };
    fetch(config.lilo_fick, requestOptions)
        .then(response => response.json())
        .then(json => {
           console.log("response: ", json)
        })
        .catch(function() {
        console.log("error")
        })
    }
 


  useEffect(() => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    fetch(config.pi_get_status, requestOptions)
    .then(response => response.json())
    .then(json => {
        console.log("json: ", json)
        setStatus({status: json[0], daysSince: json[1], date: json[2], done: true, errorLoading: false},
            )
    })
    .catch(function() {
        setStatus({errorLoading: true, done: true})
        console.log("error")
    })
}, [])
const { done, errorLoading, daysSince, date } = status
  return (
    <React.Fragment>
        {!errorLoading && done && (
            <div>
                <div className={`${status.status ? "lilo_green" : "lilo_red"}`}>{`${status.status ? "JA!" : "NEJ!"}`}</div>
                <div className='days'>Dagar sen sist: {daysSince}</div>
                <div className='days'>Datum: {date}</div>
                <button onClick={print}>Lilo fick</button>
            </div>
        )}
    {errorLoading && (
        <div className='days'>
            <p>Kunde inte hämta status</p>
        </div>
    )}
    </React.Fragment>
  );    
}
export default Tell