export const Delete = (event, {url, id, isloaded}) => {
    event.preventDefault()
    
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
    .then(isloaded(false))
    .catch(e => console.log(e))

  }

export default Delete