/* eslint-disable react/prop-types */
import React, { useState } from 'react'

const SubmitJob = (event, props) => {
    const url = props.url + props.job_id + "/notes/"
    console.log(url)
    event.preventDefault()
  
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        props.FormValues       
      ),
      
    })
    .then(response => console.log(`Status: ${response.status}`))
    .then(props.Submitting(true))
    .catch(e => console.log(e))
    
    props.setFormValues({
      ...props.FormValues,
      nimi: "",
      kuvaus: "",
      tunnit: "",
      luokitus: "",
      job_id: ""
    })

    props.isloaded(false)
}

const SubmitProject = (event, props) => {
  event.preventDefault()

  fetch(props.url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(
      props.ProjectValues
    ),
    
  })
  .then(response => console.log(`Status: ${response.status}`))
  .then(props.Submitting(true))
  .catch(e => console.log(e))
  
  props.setProjectValues({
    ...props.ProjectValues,
    nimi: "",
  })
  props.isloaded(false)
}

export const Delete = (event, props) => {
  event.preventDefault()
  const url = props.url + props.id

  fetch(url, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: props.id
    }),
  })
  .then(response => console.log(`Status: ${response.status}`))
  .then(props.Submitting(true))
  .catch(e => console.log(e))

  props.isloaded(false)
}

  const Form = (props) => {
    const [FormValues, setFormValues] = useState({
      nimi: "",
      kuvaus: "",
      tunnit: "",
      luokitus: "",
      job_id: ""
    })

    const [ProjectValues, setProjectValues] = useState({
      nimi: ""
    })

    const url = props.url
  
    return (
      props.JobView ?
      <div className="FormDiv">
        <form className="NewNote" onSubmit={e => SubmitJob(e, {FormValues, setFormValues, url, isloaded:props.isloaded, Submitting:props.Submitting, job_id: props.currentProject})}>
          <input hidden type="number" value={props.currentProject} readOnly name="job_id"></input>
          <input className="TheForm TheForm-nimi" placeholder="Tehtävän nimi" type="text" name="name" value={FormValues.nimi} onChange={e => setFormValues({...FormValues, nimi: e.target.value})} required></input>
          <input className="TheForm-kuvaus" placeholder="Kuvaus" type="text" name="desc" value={FormValues.kuvaus} onChange={e => setFormValues({...FormValues, kuvaus: e.target.value })} required></input>
          <input className="TheForm" max="255" placeholder="Tunnit" type="number" name="hours" value={FormValues.tunnit} onChange={e => setFormValues({...FormValues, tunnit: e.target.value})} required></input>
          <select value={FormValues.luokitus} onChange={e => setFormValues({...FormValues, luokitus: e.target.value})}>
            <option value="kiireellinen">Kiireellinen</option>
            <option value="rento">Rento</option>
          </select>
          <input className="TheForm" type="submit" onClick={() => setFormValues({...FormValues, job_id: props.currentProject})} value="Lähetä"></input>
        </form>
      </div>
      :
      <div className="FormDiv">
      <form className="NewNote" onSubmit={e => SubmitProject(e, {ProjectValues, setProjectValues, url, isloaded:props.isloaded, Submitting:props.Submitting})}>
        <input className="TheForm TheForm-nimi" placeholder="Projektin nimi" type="text" name="name" value={ProjectValues.nimi} onChange={e => setProjectValues({...ProjectValues, nimi: e.target.value})} required></input>
        <input className="TheForm-submit" type="submit" value="Lähetä"></input>
      </form>
    </div>
    )
  }

export default Form