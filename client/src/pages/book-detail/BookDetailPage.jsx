import "./style.css"
import CustomLink from "../../components/custom-link/CustomLink"
import Button from "../../components/button/Button"
import HeartIcon from "../../components/heart/HeartIcon"
import { useState } from "react"
import { useParams } from "react-router-dom"

const BookDetailPage = ({ books }) => {
    const [isHeart, setHeart] = useState(false)
    const { id } = useParams()

    const book = books ? books.find((book) => parseInt(id) === parseInt(book.id)) : null

    return (
        <main className="book-details-page">
            {book ? (
                <>
                    <div className="book-details">
                        <div className="image-container">
                            <img src={book.image} alt="" />
                        </div>
                        <div className="description-container">
                            <div className="title-container">
                                <h2>{book.name}</h2>
                                <Button className={isHeart ? "add-book-focus" : "add-book"} children={<HeartIcon/>}/>
                            </div>
                            <p>Author: <em><CustomLink to={`/scholar-detail/${book.author.id}`} children={<>{book.author.name}</>}/></em></p>
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
                </>
            ) : 
            (
                <h1>Book not found</h1>
            )}
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