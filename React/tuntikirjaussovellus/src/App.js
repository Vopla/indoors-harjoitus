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
  const [jobView, setJobView] = useState(false)
  const [JobData, setJobData] = useState([])

  useEffect(() => {
      fetch(url)
      .then(response => response.json())
      .then(merkinta => setData(merkinta.data))
      .finally(setLoaded(true))
      console.log("Loaded the Projects")
  }, [isloaded])

  return (

    <div className="App">

      <div className="Header">
        <Header text="Tuntikirjasovellus" className="Header-items"></Header>
        <button className="Header-items DisplayForm" onClick={() => setFormVisible(!formVisible)}>Lisää uusi merkintä</button>
      </div>
        
      {formVisible ?
        <Form url = {url} isloaded={setLoaded} jobView={jobView}></Form>
        : null
      }

      {jobView ?
      <div className="Otsikot">
          <Otsikko text="Nimi"></Otsikko>
          <Otsikko text="Kuvaus"></Otsikko>
          <Otsikko text="Tunnit"></Otsikko>
          <Otsikko text="Luokitus"></Otsikko>
      </div>
        :
        <div className="Otsikot">
          <Otsikko className="Projekti-nimi" text="Nimi"></Otsikko>
        </div>
      }

      {!isloaded ? null :
      <ListProject isloaded={setLoaded} setJobView={setJobView} jobView={jobView} data={data} url={url} jobData={JobData} setJobData={setJobData}></ListProject>
      }

      {!jobView ? null :
        <ListJob></ListJob>
      }
      

    </div>
    
  );
}

export default App;
