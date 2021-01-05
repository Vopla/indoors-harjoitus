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
  const [openProject, setOpenProject] = useState(0)
  const submitting = useRef(false)

  useEffect(() => { //hakee projektit
      fetch(url)
      .then(response => response.json())
      .then(projekti => setData(projekti.data) | setOpenProject(projekti.data[0].id))
      .finally(setIsLoaded(true))
  }, [isloaded])

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
        isloaded={setIsLoaded} 
        jobView={jobView} 
        submitting={submitting}
        currentProject={openProject}></Form>      
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
            selectedProject={openProject} 
            setSelectedProject={setOpenProject}>    
          </ListProject>
        }
      </div>

        {jobView &&
          <>  
          <div className="Tehtava">
            <ListJob
              url={url}
              openProject={openProject}
              submitting={submitting}
              showForm={setFormVisible}
              formVisible={formVisible}
              isloaded={setIsLoaded}
              setJobView={setJobView} 
            ></ListJob>
          <div className="Otsikot">
            <button className="Back-button" onClick={() => setJobView(!jobView)}>Takaisin</button>
          </div>
          </div>
          </>
        }
        </div>
      </div>  
   
  );
}

export default App;
