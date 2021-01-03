/* eslint-disable react/prop-types */
import React from 'react'
import Delete from './FormHandling'

export const ListProject = (props) =>{

  return (
    <div>
          {props.data.map(item =>   
            <ul key={item.id} className="Projekti-Osio">
              <button className="Projekti-Poista" onClick={e => Delete(e, {id:item.id, url:props.url, isloaded:props.isloaded})}>Poista projekti</button>
              <button className="Projekti-nimi " onClick={e => {e.preventDefault() | props.setSelectedProject(item.id) | props.setJobView(true)}}>{item.nimi}</button>
            </ul>
          )
        }
    </div>
  )
}

export default ListProject