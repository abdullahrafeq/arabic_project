import "./style.css"
import Button from "../../components/button/Button"
import HeartIcon from "../../components/heart/HeartIcon"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import ZigZagCircle from "../../components/zig-zag-circle/ZigZagCircle"
import useFetch from "../../hooks/useFetch"
import useFavourite from "../../hooks/useFavourite"
import useAuth from "../../hooks/useAuth"

const ScholarDetailPage = () => {
    const { isLoggedIn } = useAuth()
    const [isHeart, setHeart] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const { id } = useParams()
    const {
        request: requestScholar, 
        data: scholarData,
        errorStatus: errorStatusScholars,
      } = useFetch(`http://127.0.0.1:8000/api/scholars/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    })

    const scholar = scholarData?.scholar || {}
    const navigate = useNavigate()

    const { 
        addToFavourite: addToFavouriteScholar, 
        removeFromFavourite: removeFromFavouriteScholar,
        errorStatus: errorStatusFavouriteScholar
    } = useFavourite("http://127.0.0.1:8000/api/scholars/", scholar)

    useEffect(() => {
        requestScholar()
    }, [])

    useEffect(() => {
        if (errorStatusFavouriteScholar === null) {
            const isFavourite = scholar.is_favourite
            setHeart(isFavourite)
            setLoaded(true)
        }
    }, [scholar, errorStatusFavouriteScholar])

    useEffect(() => {
        if (errorStatusFavouriteScholar !== null) {
            console.log("error: " + errorStatusFavouriteScholar)
            navigate("/login")
        }
    }, [errorStatusFavouriteScholar])

    const handleFavouriteClick = () => {
        if (isHeart) {
            removeFromFavouriteScholar()
        } else {
            addToFavouriteScholar()
        }
        if (isLoggedIn) {
            setHeart(!isHeart)
        }
    }

    return (
        <main className="scholar-details-page">
            {scholar ? (
                <div className="scholar-details">
                    <div className="image-container">
                        <ZigZagCircle children={<>{scholar.arabic_name}</>}/>
                    </div>
                    <div className="description-container">
                        <div className="title-container">
                            <h2>{scholar.name}</h2>
                            <Button 
                                className={isHeart ? "add-scholar-focus" : "add-scholar"} 
                                children={<HeartIcon/>}
                                onClick={handleFavouriteClick}
                            />
                        </div>
                        <p><strong>Born: </strong>{scholar.birth_year}</p>
                        <p><strong>Died: </strong>{scholar.death_year}</p>
                        <p><strong>Specialized Science:</strong> Science...</p>
                        <p>Description...</p>
                    </div>

                </div>):
                (<h1>Scholar not found</h1>)
                }
        </main>        
    )
}

export default ScholarDetailPage;