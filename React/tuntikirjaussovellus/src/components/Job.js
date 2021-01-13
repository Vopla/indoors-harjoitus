import React, { useState } from 'react'
import Delete from './Deleting'
import { OtsikkoJob } from './Headers'

export const Job = (id, nimi, kuvaus, tunnit, luokitus, jobUrl, setisloaded, setJobView, setJobData) => {
    const [visible, setVisible] = useState(true)

    return(
        <>
        {visible ?
        <ul className="Osio Osio-light">
            <div className="Osio-item">
            <OtsikkoJob text="Nimi" url={jobUrl} setJobData={setJobData}></OtsikkoJob>
            <p>{nimi}</p>
            </div>
            <div className="Osio-item">
            <OtsikkoJob text="Kuvaus" url={jobUrl} setJobData={setJobData}></OtsikkoJob>
            <p>{kuvaus}</p>
            </div>
            <div className="Osio-item">
            <OtsikkoJob text="Tunnit" url={jobUrl} setJobData={setJobData}></OtsikkoJob>
            <p>{tunnit}</p>
            </div>
            <div className="Osio-item">
            <OtsikkoJob text="Luokitus" url={jobUrl} setJobData={setJobData}></OtsikkoJob>
            <p>{luokitus}</p>
            </div>

            <button className="Osio-item Osio-poista Poista Osio-light" onClick={e => Delete(e, {
                id:id, 
                url:jobUrl, 
                isloaded:setisloaded, 
                setJobView:setJobView
            }) | setVisible(false)}
                >Poista tehtävä</button>
        </ul>
        :
        null
        }
        </>
    )
}

export default Job