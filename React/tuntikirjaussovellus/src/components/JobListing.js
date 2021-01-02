/* eslint-disable react/prop-types */
import React from 'react'
import Delete from './ProjectListing'

export const ListJob = (props) => {

  return(
      <div>
            {props.jobData.length === 0 ?
              <ul className="Osio">

              </ul>
            :
            props.jobData.map(item =>   
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
