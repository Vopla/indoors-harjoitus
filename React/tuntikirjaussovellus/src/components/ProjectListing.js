/* eslint-disable react/prop-types */
import React from 'react'
import ListJob from './JobListing'

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
  .catch(e => console.log(e))

  props.isloaded(false)
}

export const ListProject = (props) =>{

  return (
    <div>
          {props.data.map(item =>   
            <ul key={item.id} className="Projekti-Osio">
              <button className="Projekti-nimi " onClick={() => ListJob({
                jobData:props.jobData,
                id:item.id}) 
                |props.setJobView(!props.JobView)}>{item.nimi}</button>
              <button className="Poista" onClick={e => Delete(e, {id:item.id, url:props.url, isloaded:props.isloaded})}>Poista projekti</button>
            </ul>
          )
        }
    </div>
  )
}

export default ListProject