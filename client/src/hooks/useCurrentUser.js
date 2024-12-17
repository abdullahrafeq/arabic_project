import useFetch from "./useFetch";
import { useState } from "react";
import { useEffect } from "react";

const useCurrentUser = () => {
    const [headers, setHeaders] = useState(null);

    const { 
        data: currentUser,
        request: requestCurrentUser,
        updateData: updateCurrentUser,
        errorStatus: errorStatusCurrentUser,
        isSuccessful: isSuccessfulUpdate,
        setSuccessful: setSuccessfulUpdate,
        isError: isFailedUpdate,
        setError: setFailedUpdate 
    } = useFetch("http://localhost:8000/api/current-user/", {
            headers: headers,
        })
    
    useEffect(() => {
        setHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        });
    }, [localStorage.getItem("accessToken")]);

    return { 
        currentUser, requestCurrentUser, updateCurrentUser, 
        errorStatusCurrentUser, isSuccessfulUpdate, 
        setSuccessfulUpdate, isFailedUpdate, setFailedUpdate }
}

export default useCurrentUser