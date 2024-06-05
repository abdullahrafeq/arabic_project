import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const useFetch = (url, { method, headers, body } = {}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState()
    const [errorStatus, setErrorStatus] = useState()
    
    const navigate = useNavigate()
    const location = useLocation()

    const request = () => {
        fetch(url, {
            method: method,
            headers: headers,
            body: body,
        })
        .then((response) => {
            console.log(response)
            if (response.status === 401) {
                navigate("/")
            }

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
        .then((response) => {
            console.log("in first then...", response)
            if (!response.ok) {
                throw response.status
            }
            return response.json()
        })
        .then((d) => {
            console.log("in the then...", d)
            console.log(d)
        })
        .catch((e) => {
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

    return { request, appendData, updateData, deleteData, data, isLoading, errorStatus }
}

export default useFetch;