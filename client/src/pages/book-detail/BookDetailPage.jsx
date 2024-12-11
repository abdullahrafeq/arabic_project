import "./style.css"
import CustomLink from "../../components/custom-link/CustomLink"
import Button from "../../components/button/Button"
import HeartIcon from "../../components/heart/HeartIcon"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
import useFavourite from "../../hooks/useFavourite"
import useAuth from "../../hooks/useAuth"
const BookDetailPage = () => {
    const { isLoggedIn } = useAuth()
    const [isHeart, setHeart] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const { id } = useParams()
    const {
        request: requestBook, 
        appendData: appendFavouriteBook, 
        data: bookData,
        errorStatus: errorStatusBooks
      } = useFetch(`http://127.0.0.1:8000/api/books/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    })

    const book = bookData?.book || []
    const navigate = useNavigate()
    
    const { 
        addToFavourite: addToFavouriteBook, 
        removeFromFavourite: removeFromFavouriteBook,
        errorStatus: errorStatusFavouriteBook
    } = useFavourite("http://127.0.0.1:8000/api/books/", book)
    
    useEffect(() => {
        requestBook()
    }, [])

    useEffect(() => {
        const isFavourite = book.is_favourite
        setHeart(isFavourite)
    }, [book])

    useEffect(() => {
        if (errorStatusFavouriteBook !== null) {
            console.log("error: " + errorStatusFavouriteBook)
            navigate("/login")
        }
    }, [errorStatusFavouriteBook])

    const handleFavouriteClick = () => {
        if (isLoggedIn) {
            setHeart(!isHeart)
        } else {
            navigate("/login")
        }
        if (isHeart) {
            removeFromFavouriteBook()
        } else {
            addToFavouriteBook()
        }
    }

    return (
        <main className="book-details-page">
            {book && book.author ? (
                <>
                    <div className="book-details">
                        <div className="image-container">
                            <img src={"http://127.0.0.1:8000/"+book.image_url} alt="" />
                        </div>
                        <div className="description-container">
                            <div className="title-container">
                                <h2>{book.name}</h2>
                                <Button 
                                    className={isHeart ? "add-book-focus" : "add-book"} 
                                    children={<HeartIcon/>}
                                    onClick={handleFavouriteClick}
                                />
                            </div>
                            <p>Author: <em className="author-title"><CustomLink to={`/scholar-detail/${book.author.id}`} children={<>{book.author.name}</>}/></em></p>
                            <p>Categories: {book.categories.map((category, index) => {
                                return (
                                    <em key={index}>{category.name}{index !== book.categories.length -1 && <>, </>} </em>
                                )
                            })}

                            </p>
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