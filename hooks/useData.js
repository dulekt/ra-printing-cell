import { useEffect, useState } from 'react'
export function useData() {
    const [printers, setPrinters] = useState([]);
    const [labels, setLabels] = useState([]);
    const [workcenters, setWorkcenters] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {

    parallelFetch()
    }, [])

    const parallelFetch = async () => {
        await Promise.all([
    fetchData('printers'),
    fetchData('labels'),
    fetchData('workcenters'),
    fetchData('users'),
    ])
    }
  async function fetchData(apiPath)  {
    setIsLoading(true)
    const response = await fetch('http://localhost:5000/${apiPath}')
    console.log('response', response)
    if(!response) {
        setIsError(true)
        setErrorMessage('No response from server')
        setIsLoading(false)
        console.log('No response from server')
        return
    }
    if(response.status >=200 && response.status <= 299) {
        console.log('response', response)
        const responseData = await response.json()
        setIsError(false)
        setIsLoading(false)
        switch(apiPath) {
            case 'workcenters':
                const dataArr = (Object.values(responseData))
                const workcenterArr = dataArr.map((workcenter) => workcenter.workcenter);
                setWorkcenters(workcenterArr);
                break;
            case 'printers':
                setPrinters(Object.values(responseData))
                break;
            case 'labels':
                setLabels(Object.values(responseData))
                break;

            case 'users':
                setUsers(Object.values(responseData))
                break;
            default:
                break;
        }
        return
    } 
    else {
        setIsError(true)
        setErrorMessage(response?.statusText || 'Something went wrong')
        setIsLoading(false)
        return
    }
    
}
console.log('printers', printers)
console.log('labels', labels)
console.log('workcenters', workcenters)
console.log('users', users)

  return { printers, labels, workcenters, users, isLoading, isError, errorMessage }
}



useData();