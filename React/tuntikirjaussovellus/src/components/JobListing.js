/* eslint-disable react/prop-types */
import {React, useEffect, useState} from 'react'
import { Job } from './Job'

export const ListJob = ({formVisible, showForm, openProjectID, url, setisloaded, setJobView, jobView}) => {
  const [jobData, setJobData] = useState([])
  const jobUrl = url + openProjectID + "/notes/"

  useEffect(() => { //hakee työtehtävät projekteille
    jobView ?
      console.log("Haettiin työtehtäviä") |
      fetch(jobUrl)
      .then(response => response.json())
      .then(tehtava => setJobData(tehtava.data))
      :
    null
  },[jobUrl, jobView])

  return(
      <>
            {jobData.length === 0 ?
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
            :            
            jobData.map(item =>{
              return(
              <Job 
                key={item.id} 
                id={item.id}
                nimi={item.nimi}
                kuvaus={item.kuvaus}
                tunnit={item.tunnit}
                luokitus={item.luokitus}
                jobUrl={jobUrl}
                setisloaded={setisloaded}
                setJobData={setJobData}
                setJobView={setJobView}
              ></Job>
              )
            }
            )
            }
      </>
  )
}

export default ListJob
