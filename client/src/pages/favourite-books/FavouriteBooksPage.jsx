import "./style.css"
import Button from "../../components/button/Button"
import CustomLink from "../../components/custom-link/CustomLink"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import useFavourite from "../../hooks/useFavourite";
import { useEffect } from "react";
import { useBaseUrl } from "../../contexts/BaseUrlContext";
import { Oval } from 'react-loader-spinner'
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const FavouriteBooksPage = () => {
    const [favBooks, setFavBooks] = useState([]);
    const BASE_URL = useBaseUrl()
    const { isLoggedIn } = useAuth()
    const navigate = useNavigate()
    const { 
        request, 
        data: booksData, 
        isLoading: isLoadingBooks,
        errorStatus: errorStatusFavouriteBooks
    } = useFetch(BASE_URL+"/api/books/")    

    const books = booksData?.books || []
    
    const removeBookFromFavourites = async (bookToRemove) => {
        await removeFromFavouriteBook(bookToRemove);
        // Refetch data to update the list
        await requestUserProfile({ token: localStorage.getItem("accessToken") });
        request() // Refetch books        
    }
    
    const { 
        data: userProfileData,
        request: requestUserProfile
    } = useFetch(BASE_URL+"/api/user-profile/", {
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const {
        removeFromFavourite: removeFromFavouriteBook,
        errorStatus: errorStatusFavouriteBook
    } = useFavourite(BASE_URL+"/api/user-profile/", "book")

    
    useEffect(() => {
        request()
        requestUserProfile({ token: localStorage.getItem("accessToken") })
    }, [])

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        }
    }, [isLoggedIn])
    useEffect(() => {
        if (userProfileData && books) {
            const favouriteBooks = books?.filter((book) => userProfileData?.favourite_books?.includes(book.id)) || []
            setFavBooks(favouriteBooks)
        }
    }, [books, userProfileData])

    return (
        <main className="favourite-books-page">
            <h2>Favourite Books</h2>
            {isLoadingBooks ? (
                <Oval
                    height={50}
                    width={50}
                    color="#4fa94d" // Your preferred color
                    strokeWidth={4} // Primary stroke width (thicker lines)
                    secondaryColor="#ddd" // Optional lighter color
                    ariaLabel="loading"
                />
            ) : favBooks.length === 0 ? (
                <p>No favorite books available.</p>
            ) : (
                <section className="grid-container">
                    {favBooks.map((book) => (
                        <BookCard 
                            key={book.id} 
                            book={book} 
                            onRemove={() => removeBookFromFavourites(book)} 
                        />
                    ))}
                </section>
            )}
            {errorStatusFavouriteBooks && (
                <p className="error-message">Error: {errorStatusFavouriteBooks}</p>
            )}
        </main>
    )
}

const BookCard = ({ book, onRemove }) => {
    return (
        <Content book={book} onRemove={onRemove}/>
    )
}

const Content = ({ book, onRemove }) => {
    return (
        <div className="card">
            <CustomLink to={`/book-detail/${book.id}`} 
                children={
                    <div className="link-container">
                        <div className="book-wrapper">
                            <div className="book-card">
                                <div className="book-cover">
                                    {book.arabic_name}
                                </div>
                                <p>{book.name}</p>
                            </div>
                        </div>
                    </div>
                }
            />
            <Button 
                className="remove-button" 
                children={<FontAwesomeIcon icon={faX}/>}
                onClick={onRemove}
            />
        </div>
    )
}

export default FavouriteBooksPage;