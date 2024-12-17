import useFetch from "./useFetch";

const useCurrentUser = () => {
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