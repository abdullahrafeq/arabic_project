import "./style.css"
import Button from "../../components/button/Button"
import CustomLink from "../../components/custom-link/CustomLink"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import useFavourite from "../../hooks/useFavourite";
import ZigZagCircle from "../../components/zig-zag-circle/ZigZagCircle";

const FavouriteScholarsPage = () => {   
    const [favScholars, setFavScholars] = useState([]);
 
    const { 
        request, 
        deleteData, 
        data: {scholars = []} = {}, 
        isLoading, 
        errorStatus
    } = useFetch("http://127.0.0.1:8000/api/scholars/")    
    
    const removeScholarFromFavorites = (scholarToRemove) => {
        setFavScholars((prevFavScholars) =>
            prevFavScholars.filter((scholar) => scholar.id !== scholarToRemove.id))
    }

    useEffect(() => {
        const favoriteScholars = scholars?.filter((scholar) => scholar.is_favourite) || []
        setFavScholars(favoriteScholars)
    }, [scholars])

    useEffect(() => {
        request()
    }, [])

    return (
        <main className="favourite-scholars-page">
            <h2>Favourite Scholars</h2>
            <section className="grid-container">
                {favScholars?.map((scholar, index) => {
                    return (
                        <ScholarCard 
                            key={index} 
                            scholar={scholar}
                            onRemove={() => removeScholarFromFavorites(scholar)}
                        />
                    )
                })}
            </section>
        </main>
    )
}


const ScholarCard = ({ scholar, onRemove }) => {
    return (
        <Content scholar={scholar} onRemove={onRemove}/>
    )
}

const Content = ({ scholar, onRemove }) => {
    const { 
        removeFromFavourite
    } = useFavourite("http://127.0.0.1:8000/api/scholars/", scholar)

    const handleRemove = () => {
        removeFromFavourite()
        onRemove()
    }

    return (
        <div className="card">
            <CustomLink to={`/scholar-detail/${scholar.id}`} children={
                <div className="link-container">
                    <div className="image-container">
                        <ZigZagCircle children={<>{scholar.arabic_name}</>}/>
                    </div>
                    <p>{scholar.name}</p>
                </div>
            }/>
            <Button 
                className="remove-button" 
                children={<FontAwesomeIcon icon={faX}/>}
                onClick={() => handleRemove(scholar)}
            />
        </div>
    )
}

export default FavouriteScholarsPage;