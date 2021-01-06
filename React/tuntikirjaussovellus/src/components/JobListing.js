/* eslint-disable react/prop-types */
import {React, useEffect, useState} from 'react'
import { OtsikkoJob, Separator } from './Headers'
import Delete from './Deleting'

export const ListJob = ({formVisible, showForm, openProjectID, submitting, url, isloaded, setisloaded, setJobView}) => {
  const [jobData, setjobData] = useState([])
  const jobUrl = url + openProjectID + "/notes/"

  useEffect(() => { //hakee työtehtävät projekteille
    fetch(jobUrl)
    .then(response => response.json())
    .then(tehtava => setjobData(tehtava.data))
  },[jobUrl, isloaded])

  return(
      <>
            {jobData.length === 0 &&
              <ul className="Osio">
                <p className="NoJobs">Ei työtehtäviä. 
                  <button className="text-button" onClick={() => showForm(!formVisible)}>
                    {formVisible ?
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
            } 

            {jobData.map(item =>   
              <ul key={item.id} className="Osio Osio-light">

                <div className="Osio-item">
                <OtsikkoJob text="Nimi:"></OtsikkoJob>
                <p>{item.nimi}</p>
                </div>
                <Separator></Separator>
                <div className="Osio-item">
                <OtsikkoJob text="Kuvaus:"></OtsikkoJob>
                <p>{item.kuvaus}</p>
                </div>
                <Separator></Separator>
                <div className="Osio-item">
                <OtsikkoJob text="Tunnit:"></OtsikkoJob>
                <p>{item.tunnit}</p>
                </div>
                <Separator></Separator>
                <div className="Osio-item">
                <OtsikkoJob text="Luokitus:"></OtsikkoJob>
                <p>{item.luokitus}</p>
                </div>
                <Separator></Separator>

                <button className="Osio-item Osio-poista Poista Osio-light" onClick={e => Delete(e, {
                  id:item.id, 
                  url:jobUrl, 
                  isloaded:setisloaded, 
                  submitting:submitting,
                  setJobView:setJobView
                })}
                  >Poista tehtävä</button>
              </ul>               
            )
            }
      </>
  )
}

export default ListJob
