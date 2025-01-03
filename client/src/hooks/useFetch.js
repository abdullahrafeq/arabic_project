import { useState } from "react"

const useFetch = (url, { headers, body } = {}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(null)
    const [errorStatus, setErrorStatus] = useState(null)
    const [response, setResponse] = useState()
    const [isSuccessful, setSuccessful] = useState(false)
    const [isError, setError] = useState(false)
    
    const request = async ({ token } = {}) => {
        setIsLoading(true)
        const finalHeaders = {
            ...headers,
            ...(token && { 'Authorization': `Bearer ${token}` }),
        }
        return fetch(url, {
            method: 'GET',
            headers: finalHeaders,
            body: body,
        })
        .then((response) => {
            console.log(response)
            if (!response.ok) {
                throw response.status
            }
            return response.json()
        })
        .then((data) => {
            console.log(data)
            setData(data)
            return data
        })
        .catch((err) => {
            setErrorStatus(err)
            console.log(err)
        })
        .finally(() => {
            setIsLoading(false); // Stop the loader
        })
    }

    const appendData = async (url, newData, { token } = {}) => {
        console.log("inside appendData", newData)
        setIsLoading(true)
        const finalHeaders = {
            ...headers,
            ...(token && { 'Authorization': `Bearer ${token}` }),
        }
        console.log(finalHeaders)
        return fetch(url, {
            method: 'POST',
            headers: finalHeaders,
            body: JSON.stringify(newData)
        })
        .then(async (response) => {
            console.log("in first then...", response)
            if (!response.ok) {
                return response.json().then(err => {
                    console.log(err)
                    setErrorStatus(err)
                    throw err
                })
            }

            return response.json()
        })
        .then((data) => {
            setData(data)
            console.log("in the second then...", data)
            return data
        })
        .catch((err) => {
            setErrorStatus(err)
            console.log(err)
            throw err
        })
        .finally(() => {
            setIsLoading(false)
        });   
    }

    const updateData = async (url, updatedData, { token } = {}) => {
        console.log(headers)
        console.log(updatedData)
        setIsLoading(true)
        console.log("isLoading: ", isLoading)
        const finalHeaders = {
            ...headers,
            ...(token && { 'Authorization': `Bearer ${token}` }),
        }
        console.log(finalHeaders)
        return fetch(url, {
            method: 'PUT',
            headers: finalHeaders,
            body: JSON.stringify(updatedData)
        })
        .then(async (response) => {
            if (!response.ok) {
                return response.json().then(err => {
                    console.log(err)
                    setErrorStatus(err)
                    setError(true)
                    throw err
                })
            }
            return response.json();
        })
        .then((data) => {
            setData(data)
            setSuccessful(true)
            console.log('Update successful:', data);
            return data
        })
        .catch((err) => {
            setErrorStatus(err)
            console.log(err);
            throw err
        })
        .finally(() => {
            setIsLoading(false)
        });
    }

    const deleteData = async (url, { token } = {}) => {
        setIsLoading(true)
        const finalHeaders = {
            ...headers,
            ...(token && { 'Authorization': `Bearer ${token}` }),
        }
        return fetch(url, {
            method: 'DELETE',
            headers: finalHeaders,
        })
        .then((response) => {
            if (response.status === 204) {
                console.log('Delete successful: No content returned');
                return null; // Return null or an empty object
            }
            return response.json()
        })
        .then((data) => {
            console.log("In second then: ", data)
            console.log('Delete successful:', data); // Log success message or data
        })    
        .catch((err) => {
            console.log(err)
            throw err
        })
        .finally(() => {
            setIsLoading(false)
        });
    }

    return { 
        request, appendData, updateData, deleteData, 
        setErrorStatus, setData, setSuccessful, setError, 
        data, isLoading, response, errorStatus, isSuccessful, isError }
}

export default useFetch;