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

const FavouriteScholarsPage = () => {   
    const [favScholars, setFavScholars] = useState([]);
    const BASE_URL = useBaseUrl()

    const { 
        request, 
        deleteData, 
        data: scholarsData, 
        isLoading, 
        errorStatus
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
        errorStatus: errorStatusFavouriteScholar
    } = useFavourite(BASE_URL+"/api/user-profile/", "scholar")

    useEffect(() => {
        if (userProfileData && scholars) {
            console.log(scholars)
            console.log(userProfileData)
            const favouriteScholars = scholars?.filter((scholar) => userProfileData?.favourite_scholars?.includes(scholar.id)) || []
            setFavScholars(favouriteScholars)
        }
    }, [scholars, userProfileData])

    useEffect(() => {
        request()
        requestUserProfile({ token: localStorage.getItem("accessToken") })
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
                            onRemove={() => removeScholarFromFavourites(scholar)}
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