import useFetch from "./useFetch"
import { useBaseUrl } from "../contexts/BaseUrlContext"

const useFavourite = (url, item) => {
    const BASE_URL = useBaseUrl()
    const { updateData, errorStatus } = useFetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
    })

    const { 
        request: requestUserProfile
    } = useFetch(BASE_URL+"/api/user-profile/", {
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const addToFavourite = async (favouriteItem) => {
        const response = await requestUserProfile({ token: localStorage.getItem("accessToken") })
        if (item === "scholar") {
            updateData(url, {
                favourite_scholars: [...response.favourite_scholars, favouriteItem.id],
            })
        } else if (item === "book") {
            updateData(url, {
                favourite_books: [...response.favourite_books, favouriteItem.id],
            })
        }
    }

    const removeFromFavourite = async (favouriteItem) => {
        const response = await requestUserProfile({ token: localStorage.getItem("accessToken") });
        if (response) {
            console.log("Fetched user profile for removal:", response);
            if (item === "scholar") {
                const updatedScholars = response.favourite_scholars.filter(id => id !== favouriteItem.id);
                updateData(url, { favourite_scholars: updatedScholars });
            } else if (item === "book") {
                const updatedBooks = response.favourite_books.filter(id => id !== favouriteItem.id);
                updateData(url, { favourite_books: updatedBooks });
            }
        }
    }

    return { addToFavourite, removeFromFavourite, errorStatus }
}

export default useFavourite;