import "./style.css"
import Button from "../../components/button/Button"
import HeartIcon from "../../components/heart/HeartIcon"
import { useState } from "react"
import { useParams } from "react-router-dom"

const ScholarDetailPage = ({ scholars }) => {
    const [isHeart, setHeart] = useState(false)

    const { id } = useParams()

    const scholar = scholars ? scholars.find((scholar) => scholar.id === parseInt(id)) : null

    return (
        <main className="scholar-details-page">
            {scholar ? (
                <div className="scholar-details">
                    <div className="image-container">
                        <img src={scholar.image} alt="" />
                    </div>
                    <div className="description-container">
                        <div className="title-container">
                            <h2>{scholar.name}</h2>
                            <Button className={isHeart ? "add-scholar-focus" : "add-scholar"} children={<HeartIcon/>}/>
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