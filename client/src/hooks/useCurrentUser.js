import useFetch from "./useFetch";

const useCurrentUser = () => {
    const { 
        data: currentUser,
        request: requestCurrentUser,
        updateData: updateCurrentUser,
        errorStatus: errorStatusCurrentUser,
        isSuccessful: isSuccessfulUpdate 
    } = useFetch("http://localhost:8000/api/current-user/", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
    
    return { currentUser, requestCurrentUser, updateCurrentUser, errorStatusCurrentUser, isSuccessfulUpdate }
}

export default useCurrentUser