export const Delete = (event, {url, id, submitting, isloaded}) => {
    event.preventDefault()
    //setJobView(false)
  
    fetch(url + id, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id
      }),
    })
    .then(response => console.log(`Status: ${response.status}`))
    .then(submitting.current = true)
    .catch(e => console.log(e))
  
    isloaded(false)
  }

export default Delete