/* eslint-disable react/prop-types */
import React from 'react'
import Delete from './ProjectListing'

export const ListJob = (props) => {
  return(
      <div>
            {props.jobData.length === 0 ?
              <ul className="Osio">
                <p className="NoJobs">Ei työtehtäviä. 
                  <button className="text-button" onClick={() => props.showForm(!props.formVisible)}>
                    {props.formVisible ?
                      <>
                      Piilota lomake
                      </>
                      :
                      <>
                      Lisää uusi
                      </>
                    }
                    </button>
                </p>
              </ul>
            :
            props.jobData.map(item =>   
              <ul key={item.id} className="Osio">
                <p className="Osio-item">{item.nimi}</p>
                <p className="Osio-item">{item.kuvaus}</p>
                <p className="Osio-item">{item.tunnit}</p>
                <p className="Osio-item">{item.luokitus}</p>
                <button className="Osio-poista Poista" onClick={e => Delete(e, {id:item.id, url:props.url, isloaded:props.isloaded})}>Poista tehtävä</button>
              </ul>
            )
          }
      </div>
  )
}

export default ListJob
