/* eslint-disable react/prop-types */
import React from 'react'

export const Delete = (event, {url, id, submitting, isloaded, setJobView}) => {
  event.preventDefault()
  setJobView(false)

  fetch(url + id, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: id
    }),
  })
  .then(response => console.log(`Status: ${response.status}`))
  .then(submitting.current = true)
  .catch(e => console.log(e))

  isloaded(false)
}

export const ListProject = (props) =>{

  return (
    <div>
          {props.data.map(item =>  
            <ul key={item.id} className="Projekti-Osio">
              <button className="Projekti-Poista" onClick={e => Delete(e, {
                  id:item.id, 
                  url:props.url, 
                  isloaded:props.isloaded, 
                  submitting:props.submitting,
                  setJobView:props.setJobView
                })}>
                Poista projekti</button>
              <button className="Projekti-nimi " onClick={() => {props.setSelectedProject(item.id) | props.setJobView(true)}}>{item.nimi}</button>
            </ul>
          )
        }
    </div>
  )
}

export default ListProject