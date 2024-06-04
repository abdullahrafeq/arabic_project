import useFetch from "./useFetch"

const useFavourite = (url, favouriteItem) => {
    const { updateData } = useFetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    })

    const addToFavourite = () => {
        updateData(url+favouriteItem.id, {...favouriteItem, is_favourite: true})
    }

    const removeFromFavourite = () => {
        updateData(url+favouriteItem.id, {...favouriteItem, is_favourite: false})
    }

    return { addToFavourite, removeFromFavourite }
}

export default useFavourite;