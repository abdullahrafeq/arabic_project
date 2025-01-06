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

const FavouriteBooksPage = () => {
    const [favBooks, setFavBooks] = useState([]);
    const BASE_URL = useBaseUrl()

    const { 
        request, 
        deleteData, 
        data: booksData, 
        isLoading, 
        errorStatus
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
        errorStatus: errorStatusFavouriteScholar
    } = useFavourite(BASE_URL+"/api/user-profile/", "book")

    
    useEffect(() => {
        request()
        requestUserProfile({ token: localStorage.getItem("accessToken") })
    }, [])
    
    useEffect(() => {
        if (userProfileData && books) {
            console.log(books)
            console.log(userProfileData)
            const favouriteBooks = books?.filter((book) => userProfileData?.favourite_books?.includes(book.id)) || []
            setFavBooks(favouriteBooks)
        }
    }, [books, userProfileData])

    return (
        <main className="favourite-books-page">
            <h2>Favourite Books</h2>
            <section className="grid-container">
                {favBooks?.map((book, index) => {
                    return (
                        <BookCard 
                            key={index}
                            book={book}
                            onRemove={() => removeBookFromFavourites(book)}
                        />
                    )
                })}
            </section>
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