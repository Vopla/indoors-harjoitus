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
  const [openProject, setOpenProject] = useState(1)
  const [Submitting, setSubmitting] = useState(false)

  useEffect(() => {
      fetch(url)
      .then(response => response.json())
      .then(projekti => setData(projekti.data))
      console.log("Loaded the Projects")
  }, [isloaded])

  useEffect(() => {
      setSubmitting(false)
      console.log("started a job fetch")
      fetch(url + openProject + "/notes/")
      .then(response => response.json())
      .then(tehtava => setJobData(tehtava.data))
      .finally(setLoaded(true))
    },[openProject, Submitting])

  return (

  <div className="App">

    <div className="Header">
      <Header text="Tuntikirjasovellus" className="Header-items"></Header>
      <button className="Header-items DisplayForm" onClick={() => setFormVisible(!formVisible)}>
        {!formVisible ? 
        <>
          Lisää uusi merkintä
        </>
        :
        <>
          Piilota lomake
        </>
        }
        </button>
    </div>

    
      {formVisible &&
        <Form url = {url} 
        isloaded={setLoaded} 
        JobView={JobView} 
        Submitting={setSubmitting}
        currentProject={openProject}></Form>      
      }

    <div className="Projektit-tehtavat">
      <div className="Projekti">
        {(isloaded, !JobView) &&
          <div className="Projekti-otsikot">
            <Otsikko className="Projekti-nimi" text="Nimi"></Otsikko>
          </div>
        }

        {isloaded &&
          <ListProject
            isloaded={setLoaded} 
            setJobView={setJobView} 
            JobView={JobView} 
            data={data} 
            url={url}
            selectedProject={openProject} 
            setSelectedProject={setOpenProject}>    
          </ListProject>
        }
      </div>

      <div>
        {JobView &&
          <> 
            <div className="Otsikot">
              {JobData.length !== 0 &&
              <>
                <Otsikko text="Nimi"></Otsikko>
                <Otsikko text="Kuvaus"></Otsikko>
                <Otsikko text="Tunnit"></Otsikko>
                <Otsikko text="Luokitus"></Otsikko>
              </>
              }
              <button className="Back-button" onClick={() => setJobView(!JobView)}>Takaisin</button>
            </div>
            <div className="Tehtava">
              <ListJob 
                jobData={JobData}
                setJobData={setJobData}
                showForm={setFormVisible}
                formVisible={formVisible}
                isloaded={setLoaded} 
              ></ListJob>
            </div>
          </>
        }
      </div>  
    </div>
  </div>      
  );
}

export default App;
