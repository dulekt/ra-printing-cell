//  useData.jsx

import { useEffect, useState } from 'react';

export default function useData() {
  const [printers, setPrinters] = useState([]);
  const [labels, setLabels] = useState([]);
  const [workcenters, setWorkcenters] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
 const REFRESH_INTERVAL = 30000;
 //! doesnt work as expected, refresh blings the whole page
  useEffect(() => {
    const paralellFetch = async () => {
        await Promise.all([
        fetchData('printers'),
        fetchData('labels'),
        fetchData('workcenters'),
        fetchData('users'),
      ]);
    };
    paralellFetch();
    }, []);



  async function fetchData(apiPath) {
    setIsLoading(true);
    const response = await fetch(`http://localhost:5000/${apiPath}`);
    if (!response) {
      setIsError(true);
      setErrorMessage('No response from server');
      setIsLoading(false);
      return;
    }
    if (response.status >= 200 && response.status <= 299) {
      const responseData = await response.json();
      setIsError(false);
      setIsLoading(false);
      switch (apiPath) {
        case 'workcenters':
          const dataArr = Object.values(responseData);
          const workcenterArr = dataArr.map(
            workcenter => workcenter.workcenter
          );
          setWorkcenters(workcenterArr);
          break;
        case 'printers':
          setPrinters(Object.values(responseData));
          break;
        case 'labels':
          setLabels(Object.values(responseData));
          break;

        case 'users':
          setUsers(Object.values(responseData));
          break;
        default:
          break;
      }
      return;
    } else {
      setIsError(true);
      setErrorMessage(response?.statusText || 'Something went wrong');
      setIsLoading(false);
      return;
    }
  }
  console.log("use data hook");
  console.log('printers', printers);
  console.log('labels', labels);
  console.log('workcenters', workcenters);
  console.log('users', users);
  return {
    printers,
    labels,
    workcenters,
    users,
    isLoading,
    isError,
    errorMessage,
    fetchData
  };
}

