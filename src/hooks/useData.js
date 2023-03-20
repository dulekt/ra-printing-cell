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

    // function that refreshes the data on call
    const refreshData = async () => {
        await Promise.all([fetchData('printers'), fetchData('labels'), fetchData('workcenters'), fetchData('users')]);
    };

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
                case 'workcenters': {
                    const dataArr = Object.values(responseData);

                    // const workcenterArr = dataArr.map(workcenter => workcenter.workcenter);
                    setWorkcenters(dataArr);

                    break;
                }

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
        } else {
            setIsError(true);

            setErrorMessage(response?.statusText || 'Something went wrong');

            setIsLoading(false);
        }
    }

    console.log('usedata hook');

    return {
        printers,
        labels,
        workcenters,
        users,
        isLoading,
        isError,
        errorMessage,
        refreshData,
    };
}
