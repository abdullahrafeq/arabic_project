import useFetch from "./useFetch";
import { useBaseUrl } from "../contexts/BaseUrlContext";

const useCurrentUser = () => {
    const BASE_URL = useBaseUrl()
    const { 
        data: currentUser,
        request: requestCurrentUser,
        updateData: updateCurrentUser,
        errorStatus: errorStatusCurrentUser,
        isSuccessful: isSuccessfulUpdate,
        setSuccessful: setSuccessfulUpdate,
        isError: isFailedUpdate,
        setError: setFailedUpdate 
    } = useFetch(BASE_URL+"/api/current-user/", {
            headers: {
                'Content-Type': 'application/json',
            },
        })

    return { 
        currentUser, requestCurrentUser, updateCurrentUser, 
        errorStatusCurrentUser, isSuccessfulUpdate, 
        setSuccessfulUpdate, isFailedUpdate, setFailedUpdate}
}

export default useCurrentUser