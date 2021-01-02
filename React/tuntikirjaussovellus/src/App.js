import './App.css';
import React, { useState, useEffect } from 'react'
import Form from './components/FormHandling'
import {ListProject} from './components/ProjectListing'
import {ListJob} from './components/JobListing'
import {Otsikko, Header} from './components/Headers'

const App = () => {
  const url = "http://127.0.0.1:3000/api/jobs/"
  const [formVisible, setFormVisible] = useState(false)
  const [data, setData] = useState([])
  const [isloaded, setLoaded] = useState(false)
  const [JobView, setJobView] = useState(false)
  const [JobData, setJobData] = useState([])

  useEffect(() => {
      fetch(url)
      .then(response => response.json())
      .then(projekti => setData(projekti.data))
      console.log("Loaded the Projects")
  }, [isloaded])

  useEffect(() => {
    data.map(project => 
      fetch(url + project.id + "/notes/")
      .then(response => response.json())
      .then(tehtava => setJobData(tehtava.data))
      .finally(setLoaded(true)),
      console.log("Loaded the Jobs")
    )}, [data])

  return (

  <div className="App">

    <div className="Header">
      <Header text="Tuntikirjasovellus" className="Header-items"></Header>
      <button className="Header-items DisplayForm" onClick={() => setFormVisible(!formVisible)}>Lisää uusi merkintä</button>
    </div>

    <div className="Projektit-tehtavat">
      {formVisible &&
        <Form url = {url} isloaded={setLoaded} JobView={JobView}></Form>      
      }

      <div className="Projekti">
        {!JobView &&
          <div className="Projekti-otsikot">
            <Otsikko className="Projekti-nimi" text="Nimi"></Otsikko>
          </div>
        }

        {isloaded &&
        <ListProject isloaded={setLoaded} setJobView={setJobView} JobView={JobView} data={data} url={url} jobData={JobData} setJobData={setJobData}></ListProject>
        }
      </div>

      <div className="Tehtava">
        {JobView &&
          <> 
            <div className="Otsikot">
                <Otsikko text="Nimi"></Otsikko>
                <Otsikko text="Kuvaus"></Otsikko>
                <Otsikko text="Tunnit"></Otsikko>
                <Otsikko text="Luokitus"></Otsikko>
                <button onClick={() => setJobView(!JobView)}>Takaisin</button>
            </div>
            <ListJob></ListJob>
          </>
        }
      </div>  
    </div>
  </div>      
  );
}

export default App;
