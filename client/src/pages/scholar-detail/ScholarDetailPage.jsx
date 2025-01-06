import "./style.css"
import Button from "../../components/button/Button"
import HeartIcon from "../../components/heart/HeartIcon"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import ZigZagCircle from "../../components/zig-zag-circle/ZigZagCircle"
import useFetch from "../../hooks/useFetch"
import useFavourite from "../../hooks/useFavourite"
import useAuth from "../../hooks/useAuth"
import { useBaseUrl } from "../../contexts/BaseUrlContext"

const ScholarDetailPage = () => {
    const { isLoggedIn } = useAuth()
    const [isHeart, setHeart] = useState(false)
    const [specialized_sciences, setSpecializedSciences] = useState([])
    const BASE_URL = useBaseUrl()

    const { id } = useParams()
    const {
        request: requestScholar,
        data: scholarData,
    } = useFetch(BASE_URL+`/api/scholars/${id}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const {
        request: requestCategories,
        data: categoriesData,
    } = useFetch(BASE_URL+"/api/book-categories/", {
        headers: {
            'Content-Type': 'application/json',
        },
    })



    const scholar = scholarData?.scholar || {}
    useEffect(() => {
        if (categoriesData && scholar) {
            const scholarCategories = categoriesData?.book_categories?.filter(category =>
                scholar.specialized_sciences?.includes(category.id)
            )
            setSpecializedSciences(scholarCategories);
        }
    }, [categoriesData, scholar])

    const navigate = useNavigate()

    const {
        addToFavourite: addToFavouriteScholar,
        removeFromFavourite: removeFromFavouriteScholar,
        errorStatus: errorStatusFavouriteScholar
    } = useFavourite(BASE_URL+"/api/user-profile/", "scholar")

    const { 
        data: userProfileData,
        request: requestUserProfile
    } = useFetch(BASE_URL+"/api/user-profile/", {
        headers: {
            'Content-Type': 'application/json',
        },
    })

    useEffect(() => {
        requestScholar()
        requestCategories()
        requestUserProfile({ token: localStorage.getItem("accessToken") })
    }, [])

    useEffect(() => {
        if (errorStatusFavouriteScholar === null) {
            const isFavourite = userProfileData?.favourite_scholars?.includes(scholar.id)
            setHeart(isFavourite)
        }
    }, [scholar, userProfileData, errorStatusFavouriteScholar])

    useEffect(() => {
        if (errorStatusFavouriteScholar !== null) {
            navigate("/login")
        }
    }, [errorStatusFavouriteScholar])

    const handleFavouriteClick = () => {
        if (isLoggedIn) {
            setHeart(!isHeart)
            if (isHeart) {
                removeFromFavouriteScholar(scholar)
            } else {
                addToFavouriteScholar(scholar)
            }
        } else {
            navigate("/login")
        }
    }

    return (
        <main className="scholar-details-page">
            {scholar ? (
                <div className="scholar-details">
                    <div className="image-container">
                        <ZigZagCircle children={<>{scholar.arabic_name}</>} />
                    </div>
                    <div className="description-container">
                        <div className="title-container">
                            <h2>{scholar.name}</h2>
                            <Button
                                className={isHeart ? "add-scholar-focus" : "add-scholar"}
                                children={<HeartIcon />}
                                onClick={handleFavouriteClick}
                            />
                        </div>
                        <p><strong>Born: </strong>{scholar.birth_year}</p>
                        <p><strong>Died: </strong>{scholar.death_year}</p>
                        <p>
                            <strong>Specialized Science: </strong>
                            {scholar.specialized_sciences && scholar.specialized_sciences.length > 0 ? (
                                specialized_sciences?.map((science, index) => (
                                    <span key={index}>
                                        {science.name}
                                        {index < specialized_sciences.length - 1 && ", "}
                                    </span>
                                ))
                            ) : (
                                "No specialized science"
                            )}
                        </p>
                        <p>
                            <strong>Description: </strong>
                            {scholar.description}
                        </p>
                    </div>

                </div>) :
                (<h1>Scholar not found</h1>)
            }
        </main>
    )
}

export default ScholarDetailPage;