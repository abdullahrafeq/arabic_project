import { useState } from "react"
import { useNavigate } from "react-router-dom"

const useFetch = (url, { headers, body } = {}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null)
    const [errorStatus, setErrorStatus] = useState()
    const [response, setResponse] = useState()
    
    const navigate = useNavigate()

    const request = () => {
        fetch(url, {
            method: 'GET',
            headers: headers,
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
        })
        .catch((err) => {
            setErrorStatus(err)
            console.log(err)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    const appendData = (url, newData) => {
        console.log("inside appendData", newData)
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(newData)
        })
        .then(response => {
            console.log("in first then...", response)
            if (!response.ok) {
                return response.json().then(err => {
                    console.log(err)
                    setErrorStatus(err)
                    throw err
                })
            }

            if (response.status === 200) {
                navigate('/')
            }
            return response.json()
        })
        .then((d) => {
            setData(d)
            console.log("in the second then...", d)
        })
        .catch((e) => {
            setErrorStatus(e)
            console.log(e)
        })      
    }

    const updateData = (url, updatedData) => {
        console.log(updatedData)
        fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(updatedData)
        })
        .then((response) => {
            if (!response.ok) {
                throw response.status;
            }
            return response.json();
        })
        .then((data) => {
            console.log('Update successful:', data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const deleteData = (url) => {
        fetch(url, {
            method: 'DELETE',
            headers: headers,
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log('Delete successful:', data); // Log success message or data
        })    
        .catch((err) => {
            console.log(err)
        })
    }

    return { request, appendData, updateData, deleteData, setErrorStatus, setData, data, isLoading, response, errorStatus }
}

export default useFetch;