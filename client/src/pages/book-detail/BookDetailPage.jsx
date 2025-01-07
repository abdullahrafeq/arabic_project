import "./style.css"
import CustomLink from "../../components/custom-link/CustomLink"
import Button from "../../components/button/Button"
import HeartIcon from "../../components/heart/HeartIcon"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
import useFavourite from "../../hooks/useFavourite"
import useAuth from "../../hooks/useAuth"
import { Oval } from 'react-loader-spinner'
import { useBaseUrl } from "../../contexts/BaseUrlContext"

const BookDetailPage = () => {
    const { isLoggedIn } = useAuth()
    const [isHeart, setHeart] = useState(false)
    const [author, setAuthor] = useState()
    const [categories, setCategories] = useState([])
    const [reviewText, setReviewText] = useState("")
    const BASE_URL = useBaseUrl()
    const { id } = useParams()
    const {
        request: requestBook, 
        data: bookData,
        errorStatus: errorStatusBooks,
        isLoading: isLoadingBook
      } = useFetch(BASE_URL+`/api/books/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    })

    const {
        request: requestScholars,
        data: scholarsData
    } = useFetch(BASE_URL+"/api/scholars/", {
        headers: {
        'Content-Type': 'application/json',
        }
    },) 

    const {
        request: requestCategories,
        data: categoriesData
    } = useFetch(BASE_URL+"/api/book-categories/", {
        headers: {
        'Content-Type': 'application/json',
        }
    },)

    const book = bookData?.book || []
    const navigate = useNavigate()
    
    const { 
        addToFavourite: addToFavouriteBook, 
        removeFromFavourite: removeFromFavouriteBook,
        errorStatus: errorStatusFavouriteBook
    } = useFavourite(BASE_URL+"/api/user-profile/", "book")
    
    const { 
        data: userProfileData,
        request: requestUserProfile
    } = useFetch(BASE_URL+"/api/user-profile/", {
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const { 
        data: reviewsData,
        request: requestReviews,
        appendData: addReview,
        isLoading: isLoadingReviews
    } = useFetch(BASE_URL+"/api/reviews/", {
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const { 
        data: usersData,
        request: requestUsers,
    } = useFetch(BASE_URL+"/api/all-users/", {
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const { 
        data: currentUserData,
        request: requestCurrentUser,
    } = useFetch(BASE_URL+"/api/current-user/", {
        headers: {
            'Content-Type': 'application/json',
        },
    })

    useEffect(() => {
        requestBook()
        requestUserProfile({ token: localStorage.getItem("accessToken") })
        requestReviews()
        requestUsers()
        requestCurrentUser({ token: localStorage.getItem("accessToken") })
    }, [])

    useEffect(() => {
        if (errorStatusFavouriteBook === null) {
            const isFavourite = userProfileData?.favourite_books?.includes(book.id)
            setHeart(isFavourite)
        }
    }, [book, userProfileData, errorStatusBooks, errorStatusFavouriteBook])

    useEffect(() => {
        if (errorStatusFavouriteBook !== null) {
            navigate("/login")
        }
    }, [errorStatusFavouriteBook])


    const handleFavouriteClick = () => {
        if (isLoggedIn) {
            setHeart(!isHeart)
            if (isHeart) {
                removeFromFavouriteBook(book)
            } else {
                addToFavouriteBook(book)
            }
        } else {
            navigate("/login")
        }
    }

    const handleSubmit = async (review, book) => {
        if (isLoggedIn) {
            await addReview(BASE_URL+"/api/reviews/", 
                { 
                    review: review,
                    user: currentUserData?.user?.id,
                    book: book?.id
                }, 
                { token: localStorage.getItem("accessToken") })
            await requestReviews()
            setReviewText("");
        } else {
            navigate("/login")
        }
    }

    useEffect(() => {
        if (book?.author) {
            requestScholars()
            requestCategories()
        }
    }, [book])

    useEffect(() => {
        if (scholarsData?.scholars && book.author) {
            const matchedAuthor = scholarsData.scholars.find((scholar) => scholar.id === book.author) 
            setAuthor(matchedAuthor || null)
        }
    }, [scholarsData])

    useEffect(() => {
        if (categoriesData?.book_categories && book.categories) {
            const bookCategories = book.categories.map((categoryID) => categoriesData.book_categories.find((category) => {
                return category.id === categoryID
            }))
            setCategories(bookCategories)
        }
    }, [categoriesData])
    
    return (
        <main className="book-details-page">
            {isLoadingBook ? (
                <div className="loading-spinner">
                    <Oval
                        height={50}
                        width={50}
                        color="#4fa94d" // Your preferred color
                        strokeWidth={4} // Primary stroke width (thicker lines)
                        secondaryColor="#ddd" // Optional lighter color
                        ariaLabel="loading"
                    />
                </div>
            ) : book && book.author ? (
                <>
                    <div className="book-details">
                        <div className="book-wrapper">
                            <div className="book-card">
                                <div className="book-cover">
                                    {book.arabic_name}
                                </div>
                            </div>
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
                            <p>Author: <em className="author-title"><CustomLink to={`/scholar-detail/${author?.id}`} children={<>{author?.name}</>}/></em></p>
                            <p>Categories: {categories.map((category, index) => {
                                return (
                                    <em key={index}>{category.name}{index !== book.categories.length -1 && <>, </>} </em>
                                )
                            })}

                            </p>
                            <p> 
                                <strong>Description: </strong>
                                {book.description}
                            </p>
                            <strong>
                                Reviews: {reviewsData?.reviews?.filter((review) => review.book === book.id).length || 0}
                            </strong>

                            <hr />
                        </div>
                    </div>
                    <h2 className="reviews-title">Reviews</h2>
                    <hr />
                    <div className="reviews-container">
                        <div className="previous-reviews">
                            {usersData && reviewsData?.reviews?.map((review, index) => {
                                if (review.book === book.id) {
                                    return (
                                        <Review key={index} review={review} users={usersData?.users}/>
                                    )
                                }
                            })}
                            
                        </div>
                        <form action="">
                            <label htmlFor="">Submit review:</label>
                            <textarea value={reviewText} name="" id="" rows={5} onChange={(event) => setReviewText(event.target.value)}></textarea>
                        </form>
                        <Button className="submit-button" children={
                            <>
                                <>Submit</>
                                {isLoadingReviews &&
                                    <Oval
                                        height={30} 
                                        width={30} 
                                        color="#fff" /* Neutral gray or preferred color */
                                        strokeWidth={4} // Primary stroke width (thicker lines)
                                        secondaryColor="#ddd" /* Optional lighter color */
                                        ariaLabel="oval-loading"
                                    />
                                }
                            </>
                        } onClick={() => handleSubmit(reviewText, book)}/>
                    </div>
                </>
            ) : 
            (
                <h1>Book not found</h1>
            )}
        </main>        
    )
}

const Review = ({ users, review }) => {
    const user = users?.find((user) => user.id === review.user)
    return (
        <div className="review">
            <p><strong>{user?.username}</strong></p>
            <p>{review?.review}</p>
        </div>
    )
}

export default BookDetailPage;