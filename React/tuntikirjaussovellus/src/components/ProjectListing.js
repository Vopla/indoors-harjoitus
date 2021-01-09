/* eslint-disable react/prop-types */
import React from 'react'
import Delete from './Deleting'

export const ListProject = (props) =>{

  return (
    <div>
          {props.data.map(item =>
            props.selectedProject === item.id ? //valittu projekti
            <ul key={item.id} className="Projekti-Osio Osio-light">
              <button className="Projekti-Poista Osio-light" onClick={e => Delete(e, {
                  id:item.id, 
                  url:props.url, 
                  isloaded:props.isloaded
                })}>
                Poista projekti</button>
                <div className="Projekti-nimi-div">
                <button className="Projekti-nimi Osio-light" onClick={() => 
                {props.setSelectedProject(item.id)
                | props.setJobView(true) 
                | props.setSelectedProjectName(item.nimi)}}
                 >{item.nimi}</button>
                </div>
            </ul>
            :
            <ul key={item.id} className="Projekti-Osio">
              <button className="Projekti-Poista" onClick={e => Delete(e, {
                  id:item.id, 
                  url:props.url, 
                  isloaded:props.isloaded
                })}>
                Poista projekti</button>
                <div className="Projekti-nimi-div">
                <button className="Projekti-nimi" onClick={() => 
                {props.setSelectedProject(item.id)
                | props.setJobView(true) 
                | props.setSelectedProjectName(item.nimi)}}
                 >{item.nimi}</button>
                </div>
            </ul>           
          )
        }
    </div>
  )
}

export default ListProject