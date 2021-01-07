export const OrderBy = ({url, order_by, setJobData}) => {
    const NotesUrl = url + order_by.toLowerCase()
    
    fetch(NotesUrl)
    .then(response => response.json())
    .then(tehtava => setJobData(tehtava.data))
    .catch(e => console.log(e))

    
}
export default OrderBy