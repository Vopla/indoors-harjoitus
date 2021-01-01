/* eslint-disable react/prop-types */
import React from 'react'
import Delete from './ProjectListing'

export const ListJob = (props) => {
  const url = `${props.url + props.id}/notes/`
  console.log(props)

  if(!props.jobView){
    fetch(url)
    .then(response => response.json())
    .then(payload => props.setJobData(payload.data))
    .then(console.log(props.jobData))
    .finally(props.isloaded(true))
    .catch(err => console.log(err))
}

  return(
      <div>
            {props.jobData.map(item =>   
              <ul key={item.id} className="Osio">
                <p className="Nimi">{item.nimi}</p>
                <p className="Kuvaus">{item.kuvaus}</p>
                <p className="Tunnit">{item.tunnit}</p>
                <p className="Luokitus">{item.luokitus}</p>
                <button className="Poista" onClick={e => Delete(e, [item.id, props.url])}>Poista tehtävä</button>
              </ul>
            )
          }
      </div>
  )
}

export default ListJob
