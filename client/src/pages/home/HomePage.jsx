import ScholarCard from "./components/scholar-card/ScholarCard";
import "./style.css"
import BookCard from "./components/book-card/BookCard";
import AlKitab from "../../assets/alkitab.jpg"
import Quote from "./components/quote/Quote";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";

const HomePage = () => {
    const { 
        request: requestScholars, 
        data: scholarsData, 
        isLoading: isLoadingScholars, 
        errorStatus: errorStatusScholars
    } = useFetch("http://127.0.0.1:8000/api/scholars/");

    const { 
        request: requestBooks, 
        data: booksData, 
        isLoading: isLoadingBooks, 
        errorStatus: errorStatusBooks
    } = useFetch("http://127.0.0.1:8000/api/books/");

    const { 
        request: requestQuotes, 
        data: quotesData, 
        isLoading: isLoadingQuotes, 
        errorStatus: errorStatusQuotes
    } = useFetch("http://127.0.0.1:8000/api/quotes/");

    useEffect(() => {
        requestScholars();
        requestBooks();
        requestQuotes();
    }, []);

    const scholars = scholarsData?.scholars || [];
    const books = booksData?.books || [];
    const quotes = quotesData?.quotes || [];

    return (
        <div className="home-page">
            <div className="search">
                <h1>Learn About Our Scholars</h1>
                <input type="text" placeholder="Search..." />
            </div>
            <div className="scholars">
                <h1>Famous Scholars</h1>
                <div className="scholars-grid">
                    {scholars.filter((scholar) => scholar.is_on_home_page === true).map((scholar, index) => {
                        return (
                            <ScholarCard 
                                key={index}
                                id={scholar.id} 
                                year_category={scholar.year_category.name} 
                                name={scholar.name}
                                arabic_name={scholar.arabic_name}
                            />
                        )
                    })}
                </div>
            </div>
            <div className="books">
                <h1>Popular books</h1>
                <div className="books-grid">
                    {books.filter((book) => book.is_on_home_page === true).map((book, index) => {
                        return (
                            <BookCard
                                key={index}
                                id={book.id}
                                name={book.name} 
                                author={book.author.name} 
                                img={"http://127.0.0.1:8000/"+book.image_url}
                            />
                        )
                    })}
                </div>
            </div>
            <div className="quotes">
                <h1>Inspirational Quotes</h1>
                <div className="quotes-card-container">
                    {quotes.filter((quote) => quote.is_on_home_page === true).map((quote, index) => {
                        return (
                            <Quote key={index} quote={quote.quote} author={quote.author.name}/>                            
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default HomePage;