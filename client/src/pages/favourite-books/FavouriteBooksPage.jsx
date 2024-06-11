import "./style.css"
import Button from "../../components/button/Button"
import CustomLink from "../../components/custom-link/CustomLink"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import useFavourite from "../../hooks/useFavourite";
import { useEffect } from "react";

const FavouriteBooksPage = () => {
    const [favBooks, setFavBooks] = useState([]);
 
    const { 
        request, 
        deleteData, 
        data: booksData, 
        isLoading, 
        errorStatus
    } = useFetch("http://127.0.0.1:8000/api/books/")    

    const books = booksData?.books || []
    
    const removeBookFromFavorites = (bookToRemove) => {
        setFavBooks((prevFavBooks) =>
            prevFavBooks.filter((book) => book.id !== bookToRemove.id))
    }

    useEffect(() => {
        const favoriteBooks = books?.filter((book) => book.is_favourite) || []
        setFavBooks(favoriteBooks)
    }, [books])

    useEffect(() => {
        request()
    }, [])

    return (
        <main className="favourite-books-page">
            <h2>Favourite Books</h2>
            <section className="grid-container">
                {favBooks?.map((book, index) => {
                    return (
                        <BookCard 
                            key={index}
                            book={book}
                            onRemove={() => removeBookFromFavorites(book)}
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
    const { 
        removeFromFavourite
    } = useFavourite("http://127.0.0.1:8000/api/books/", book)
    
    const handleRemove = () => {
        removeFromFavourite()
        onRemove()
    }

    return (
        <div className="card">
            <CustomLink to={`/book-detail/${book.id}`} 
                children={
                    <div className="link-container">
                        <img src={"http://127.0.0.1:8000/"+book.image_url} alt="" />
                        <p>{book.name}</p>
                    </div>
                }
            />
            <Button 
                className="remove-button" 
                children={<FontAwesomeIcon icon={faX}/>}
                onClick={handleRemove}
            />
        </div>
    )
}

export default FavouriteBooksPage;