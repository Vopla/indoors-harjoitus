import './App.css';
import React, { useState, useEffect} from 'react'
import Form from './components/FormHandling'
import {ListProject} from './components/ProjectListing'
import ListJob from './components/JobListing'
import {Otsikko, Header} from './components/Headers'

const App = () => {
  const url = "http://127.0.0.1:3000/api/jobs/" //mistä tiedot
  const [formVisible, setFormVisible] = useState(false) //onko uusien projektien/työtehtävien lomake auki
  const [data, setData] = useState([]) //Projektit
  const [isloaded, setIsLoaded] = useState(false) //tarvitaanko uutta dataa palvelimelta
  const [jobView, setJobView] = useState(false) //onko työtehtävänäkymä avoinna
  const [openProjectID, setOpenProjectID] = useState(null) //valittu projekti
  const [openProjectName, setOpenProjectName] = useState("") //valitun projektin nimi

  useEffect(() => { //hakee projektit
      console.log("Haettiin projekteja")
      fetch(url)
      .then(response => response.json())
      .then(projekti => setData(projekti.data))
      .finally(setIsLoaded(true))
  }, [isloaded, formVisible])

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
        <Form 
        url = {url} 
        isloaded={setIsLoaded} 
        jobView={jobView} 
        currentProject={openProjectID}
        currentProjectName={openProjectName}>
        </Form>      
      }
    <div className="Projektit-tehtavat">
      <div className="Projekti">
        {isloaded ?
          <div className="Projekti-otsikot">
            <Otsikko className="Projekti-nimi" text="Projektin nimi"></Otsikko>
          </div>
          :
          <div>
            <Otsikko text={"Ladataan..."}></Otsikko>
          </div>
          
        }

        {isloaded &&
          <ListProject
            isloaded={setIsLoaded}
            setJobView={setJobView}
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
            <button className="Back-button" onClick={() => setJobView(!jobView) | setOpenProjectID(null)}>Takaisin</button>
          </div>
            <ListJob
              url={url}
              openProjectID={openProjectID}
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
