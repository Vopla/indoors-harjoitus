/* eslint-disable react/prop-types */
import React, { useState } from 'react'

const SubmitJob = (event, props) => {
    const url = props.url + props.job_id + "/notes/"
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
    .then(props.isloaded(false))
    .catch(e => console.log(e))
    
    props.setFormValues({
      ...props.FormValues,
      nimi: "",
      kuvaus: "",
      tunnit: "",
      luokitus: "",
      job_id: ""
    })
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
  .then(props.isloaded(false))
  .catch(e => console.log(e))
  
  props.setProjectValues({
    ...props.ProjectValues,
    nimi: "",
  })
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
      props.jobView ? //ollaanko katsomassa projektien työtehtäviä
      <div className="FormDiv">
        <form className="NewNote" onSubmit={e => SubmitJob(e, {FormValues, setFormValues, url, isloaded:props.isloaded, job_id: props.currentProject})}>
          <input className="TheForm TheForm-projektinimi" disabled value={props.currentProjectName}></input>
          <input hidden type="number" value={props.currentProject} readOnly name="job_id"></input>
          <input className="TheForm TheForm-nimi" placeholder="Tehtävän nimi" type="text" name="name" value={FormValues.nimi} onChange={e => setFormValues({...FormValues, nimi: e.target.value})} required></input>
          <input className="TheForm TheForm-kuvaus" placeholder="Kuvaus" type="text" name="desc" value={FormValues.kuvaus} onChange={e => setFormValues({...FormValues, kuvaus: e.target.value })} required></input>
          <input className="TheForm TheForm-tunnit" max="255" placeholder="Tunnit" type="number" name="hours" value={FormValues.tunnit} onChange={e => setFormValues({...FormValues, tunnit: e.target.value})} required></input>
          <select value={FormValues.luokitus} className="TheForm TheForm-luokitus" onChange={e => setFormValues({...FormValues, luokitus: e.target.value})}>
            <option value="">Ei luokitusta</option>
            <option value="kiireellinen">Kiireellinen</option>
            <option value="rento">Rento</option>
          </select>
          <input className="TheForm TheForm-submit" type="submit" onClick={() => setFormValues({...FormValues, job_id: props.currentProject})} value="Lähetä"></input>
        </form>
      </div>
      : //vain projektit auki
      <div className="FormDiv">
      <form className="NewNote" onSubmit={e => SubmitProject(e, {ProjectValues, setProjectValues, url, isloaded:props.isloaded})}>
        <input className="TheForm TheForm-projektinimi" placeholder="Projektin nimi" type="text" name="name" value={ProjectValues.nimi} onChange={e => setProjectValues({...ProjectValues, nimi: e.target.value})} required></input>
        <input className="TheForm TheForm-submit" type="submit" value="Lähetä"></input>
      </form>
    </div>
    )
  }

export default Form