import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const useFetch = (url) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(null)
    const [errorStatus, setErrorStatus] = useState(null)
    
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        fetch(url)
        .then((response) => {
            if (response.status === 401) {
                navigate("/", {
                    state: {
                        previousUrl: location.pathname,
                    },
                })
            }
            if (!response.ok) {
                throw response.status
            }

            return response.json()
        })
        .then((data) => {
            setData(data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])
    console.log(data)

    return { data, setData, errorStatus }
}

export default useFetch;