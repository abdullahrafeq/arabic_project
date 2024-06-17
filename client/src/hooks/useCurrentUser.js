import useFetch from "./useFetch";

const useCurrentUser = () => {
    const { 
        data: currentUser,
        request: requestUser,
        updateData: updateUser,
        errorStatus: errorStatusUser 
    } = useFetch("http://localhost:8000/api/current-user/", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
    
    return { currentUser, requestUser, updateUser, errorStatusUser }
}

export default useCurrentUser