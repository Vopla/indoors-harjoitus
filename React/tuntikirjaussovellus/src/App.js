import './App.css';
import React, { useState, useEffect, useRef} from 'react'
import Form from './components/FormHandling'
import {ListProject} from './components/ProjectListing'
import ListJob from './components/JobListing'
import {Otsikko, Header} from './components/Headers'

const App = () => {
  const url = "http://127.0.0.1:3000/api/jobs/"
  const [formVisible, setFormVisible] = useState(false)
  const [data, setData] = useState([])
  const [isloaded, setIsLoaded] = useState(false)
  const [jobView, setJobView] = useState(false)
  const [openProjectID, setOpenProjectID] = useState(0)
  const [openProjectName, setOpenProjectName] = useState("")
  const submitting = useRef(false)

  useEffect(() => { //hakee projektit
    !isloaded?
      fetch(url)
      .then(response => response.json())
      .then(projekti => setData(projekti.data))
      .finally(setIsLoaded(true))
    :
    null
  }, [isloaded])

  return (

  <div className="App">

    <div className="Header">
      <Header text="Tuntikirjasovellus" className="Header-items"></Header>
      {formVisible ? 
      <button className="Header-items DisplayForm Osio-light" onClick={() => setFormVisible(!formVisible)}>Piilota lomake</button>
      : 
      <button className="Header-items DisplayForm" onClick={() => setFormVisible(!formVisible)}>Lisää uusi merkintä</button>
      }
    </div>

      {formVisible &&
        <Form url = {url} 
        isloaded={setIsLoaded} 
        jobView={jobView} 
        submitting={submitting}
        currentProject={openProjectID}
        currentProjectName={openProjectName}></Form>      
      }
    <div className="Projektit-tehtavat">
      <div className="Projekti">
        {(isloaded) &&
          <div className="Projekti-otsikot">
            <Otsikko className="Projekti-nimi" text="Projektin nimi"></Otsikko>
          </div>
        }

        {isloaded &&
          <ListProject
            isloaded={setIsLoaded}
            setJobView={setJobView}
            submitting={submitting} 
            jobView={jobView} 
            data={data} 
            url={url}
            selectedProject={openProjectID} 
            setSelectedProject={setOpenProjectID}
            setSelectedProjectName={setOpenProjectName}>    
          </ListProject>
        }
      </div>

        {jobView &&
          <>  
          <div className="Tehtava">
          <div className="Otsikot">
            <button className="Back-button" onClick={() => setJobView(!jobView)}>Takaisin</button>
          </div>
            <ListJob
              url={url}
              openProjectID={openProjectID}
              submitting={submitting}
              showForm={setFormVisible}
              formVisible={formVisible}
              isloaded={isloaded}
              setisloaded={setIsLoaded}
              jobView={jobView}
              setJobView={setJobView}
            ></ListJob>
          
          </div>
          </>
        }
        </div>
      </div>  
   
  );
}

export default App;
