import "./style.css"
import Alkitab from "../../assets/alkitab.jpg"
import CustomLink from "../../components/custom-link/CustomLink"
import Button from "../../components/button/Button"
import HeartIcon from "../../components/heart/HeartIcon"
import { useState } from "react"

const BookDetailPage = () => {
    const [isHeart, setHeart] = useState(false)

    return (
        <main className="book-details-page">
            <div className="book-details">
                <div className="image-container">
                    <img src={Alkitab} alt="" />
                </div>
                <div className="description-container">
                    <div className="title-container">
                        <h2>Al Kitab</h2>
                        <Button className={isHeart ? "add-book-focus" : "add-book"} children={<HeartIcon/>}/>
                    </div>
                    <p>Author: <em><CustomLink to="/scholar-detail" children={<>Sibawaihy</>}/></em></p>
                    <strong>Reviews: 27</strong>
                    <hr />
                    <p>Description of the book...</p>
                </div>
            </div>
            <h2 className="reviews-title">Reviews</h2>
            <hr />
            <div className="reviews-container">
                <div className="previous-reviews">
                    <Review/>
                    <Review/>
                    <Review/>
                    <Review/>
                    <Review/>
                    <Review/>
                </div>
                <form action="">
                    <label htmlFor="">Submit review:</label>
                    <textarea name="" id="" rows={5}></textarea>
                </form>
                <Button className="submit-button" children={<>Submit</>}/>
            </div>
        </main>        
    )
}

const Review = () => {
    return (
        <div className="review">
            <p>Username</p>
            <p>Review...</p>
        </div>
    )
}

export default BookDetailPage;