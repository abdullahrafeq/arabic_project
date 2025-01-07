import "./style.css"
import Button from "../../components/button/Button"
import CustomLink from "../../components/custom-link/CustomLink"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import useFavourite from "../../hooks/useFavourite";
import ZigZagCircle from "../../components/zig-zag-circle/ZigZagCircle";
import { useBaseUrl } from "../../contexts/BaseUrlContext";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Oval } from 'react-loader-spinner'

const FavouriteScholarsPage = () => {   
    const [favScholars, setFavScholars] = useState([]);
    const BASE_URL = useBaseUrl()
    const { isLoggedIn } = useAuth()
    const navigate = useNavigate()

    const { 
        request, 
        data: scholarsData,
        isLoading: isLoadingScholars,
        errorStatus: errorStatusFavouriteScholars
    } = useFetch(BASE_URL+"/api/scholars/")    
    
    const removeScholarFromFavourites = async (scholarToRemove) => {
        await removeFromFavouriteScholar(scholarToRemove);
        // Refetch data to update the list
        await requestUserProfile({ token: localStorage.getItem("accessToken") });
        request() // Refetch books      
    }
    const scholars = scholarsData?.scholars || [];

    const { 
        data: userProfileData,
        request: requestUserProfile
    } = useFetch(BASE_URL+"/api/user-profile/", {
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const {
        removeFromFavourite: removeFromFavouriteScholar,
    } = useFavourite(BASE_URL+"/api/user-profile/", "scholar")

    useEffect(() => {
        if (userProfileData && scholars) {
            const favouriteScholars = scholars?.filter((scholar) => userProfileData?.favourite_scholars?.includes(scholar.id)) || []
            setFavScholars(favouriteScholars)
        }
    }, [scholars, userProfileData])

    useEffect(() => {
        request()
        requestUserProfile({ token: localStorage.getItem("accessToken") })
    }, [])

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        }
    }, [isLoggedIn])

    return (
        <main className="favourite-scholars-page">
            <h2>Favourite Scholars</h2>
            <section className="grid-container">
            {isLoadingScholars ? (
                <Oval
                    height={50}
                    width={50}
                    color="#4fa94d" // Your preferred color
                    strokeWidth={4} // Primary stroke width (thicker lines)
                    secondaryColor="#ddd" // Optional lighter color
                    ariaLabel="loading"
                />
            ) : favScholars.length === 0 ? (
                <p>No favorite scholars available.</p>
            ) : (
                <section className="grid-container">
                    {favScholars.map((scholar) => (
                        <ScholarCard 
                            key={scholar.id} 
                            scholar={scholar} 
                            onRemove={() => removeScholarFromFavourites(scholar)} 
                        />
                    ))}
                </section>
            )}
            {errorStatusFavouriteScholars && (
                <p className="error-message">Error: {errorStatusFavouriteScholars}</p>
            )}
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
                onClick={onRemove}
            />
        </div>
    )
}

export default FavouriteScholarsPage;