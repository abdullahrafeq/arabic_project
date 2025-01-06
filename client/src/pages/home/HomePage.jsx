import ScholarCard from "./components/scholar-card/ScholarCard";
import "./style.css"
import BookCard from "./components/book-card/BookCard";
import AlKitab from "../../assets/alkitab.jpg"
import Quote from "./components/quote/Quote";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import EditModal from "../../components/modal/EditModal";
import { useState } from "react";

const HomePage = () => {
    const { isAdmin } = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("")
    const [selectedQuote, setSelectedQuote] = useState(null);
    const [authors, setAuthors] = useState([])

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
        appendData: addQuotes, 
        data: quotesData,
        errorStatus: errorStatusQuotes
      } = useFetch("http://127.0.0.1:8000/api/quotes/", {
        headers: {
          'Content-Type': 'application/json',
        },
    })

    const { 
        updateData: updateQuote,
        deleteData: deleteQuote
    } = useFetch("", {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    useEffect(() => {
        console.log("init homepage")
        requestScholars();
        requestBooks();
        requestQuotes();
    }, []);

    useEffect(() => {
        console.log(scholarsData)
        setAuthors(scholarsData?.scholars)
    }, [scholarsData])

    useEffect(() => {
        console.log(authors)
    }, [authors])

    useEffect(() => {
        if (selectedQuote && modalMode === "edit") {
            setIsModalOpen(true);
            setAuthors(authors)
        } else if (modalMode === "add") {
            setIsModalOpen(true);
            setAuthors(authors)
        } else if (selectedQuote && modalMode === "delete") {
            setIsModalOpen(true);
        }
    }, [selectedQuote, modalMode]);

    const scholars = scholarsData?.scholars || [];
    const books = booksData?.books || [];
    const quotes = quotesData?.quotes || [];

    useEffect(() => {
        console.log(books)
    }, [books])

    const handleSave = async (updatedData) => {
        if (modalMode === "edit" && selectedQuote) {
            const url = `http://127.0.0.1:8000/api/quotes/${selectedQuote.id}/`;
            try {
                await updateQuote(url, updatedData, { token: localStorage.getItem("accessToken") });
                setIsModalOpen(false)
                setSelectedQuote(null)
                await requestQuotes()
            } catch (err) {
                console.error("Error during update quote: ", err)
            }
        } else if (modalMode === "add") {
            try {
                console.log(updatedData)
                const newQuote = await addQuotes(
                    "http://127.0.0.1:8000/api/quotes/",
                    updatedData,
                    { token: localStorage.getItem("accessToken") })
                setIsModalOpen(false)
                setModalMode("")
                console.log("newQuote: ", newQuote)
                console.log("newQuote inside: ", newQuote?.quotes)
            } catch (err) {
                console.error("Error during adding quote: ", err)
            }
        } else if (modalMode === "delete") {
            try {
                const url = `http://127.0.0.1:8000/api/quotes/${selectedQuote.id}/`;
                await deleteQuote(url, { token: localStorage.getItem("accessToken") })
                setIsModalOpen(false)
                setSelectedQuote(null)
                await requestQuotes()
            } catch (err) {
                console.error("Error during delete quote: ", err)
            }
        }
    }

    useEffect(() => {
        requestQuotes()
    }, [isModalOpen])

    return (
        <div className="home-page">
            <div className="search">
                <h1>Learn About Our Scholars</h1>
            </div>
            <div className="scholars">
                <h1>Famous Scholars</h1>
                <div className="scholars-grid">
                    {scholars.filter((scholar) => scholar.is_on_home_page === true).map((scholar, index) => {
                        return (
                            <ScholarCard 
                                key={index}
                                id={scholar.id} 
                                birth={scholar.birth_year}
                                death={scholar.death_year}
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
                        //const author = scholars.find((scholar) => scholar.id === book.author)
                        return (
                            <BookCard
                                key={index}
                                id={book.id}
                                name={book.name}
                                arabicName={book.arabic_name}
                                //author={author.name} 
                            />
                        )
                    })}
                </div>
            </div>
            <div className="quotes">
                <h1>Inspirational Quotes</h1>
                <div className="quotes-card-container">
                    {isAdmin && 
                        <div class="add-quote-container">
                            <button onClick={() => setModalMode("add")}>
                                <p className="add-quote"><strong><FontAwesomeIcon icon={faPlus}/></strong></p>
                            </button>
                        </div>
                    }
                    {quotes.filter((quote) => quote.is_on_home_page === true).map((quote, index) => {
                        const author = scholars.find((scholar) => scholar.id === quote.author)
                        return (
                            <div className="quote-wrapper">
                                <Quote key={index} quote={quote.quote} arabic_quote={quote.arabic_quote} author={author?.name}/>                            
                                {isAdmin && (
                                    <button className="delete-btn" onClick={() => {
                                        setSelectedQuote(quote)
                                        setModalMode("delete")
                                    }}>
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                )}
                                {isAdmin && (
                                    <button className="edit-btn" onClick={() => {
                                        setSelectedQuote(quote)
                                        setModalMode("edit")
                                    }}>
                                        <FontAwesomeIcon icon={faGear} />
                                    </button>
                                )}
                            </div>
                        )
                    })}
                    <EditModal
                        isOpen={isModalOpen}
                        onClose={() => {
                            setIsModalOpen(false)
                            setModalMode("")
                        }}
                        editedElement={selectedQuote}
                        onSave={handleSave}
                        type="quote"
                        authors={authors}
                        modalMode={modalMode}
                    />
                </div>
            </div>
        </div>
    )
}

export default HomePage;