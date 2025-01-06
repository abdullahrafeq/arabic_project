import BookCard from "../home/components/book-card/BookCard";
import FilterElement from "../../components/filter-element/FilterElement";
import "./style.css"
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import useSearch from "../../hooks/useSearch";
import useAuth from "../../hooks/useAuth";
import EditModal from "../../components/modal/EditModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useBaseUrl } from "../../contexts/BaseUrlContext";

const BooksPage = () => {
    const { isAdmin } = useAuth()
    const [selectedBook, setSelectedBook] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("")
    const [books, setBooks] = useState([])
    const [filtered, setFiltered] = useState([])
    const [authors, setAuthors] = useState([])
    const BASE_URL = useBaseUrl()
    const {
        request: requestBooks, 
        appendData: addBooks, 
        data: booksData,
        errorStatus: errorStatusBooks
      } = useFetch(BASE_URL+"/api/books/", {
        headers: {
          'Content-Type': 'application/json',
        },
    })

    const {
        request: requestScholars, 
        data: scholarsData,
    } = useFetch(BASE_URL+"/api/scholars/", {
        headers: {
          'Content-Type': 'application/json',
        },
    })

    useEffect(() => {
        setAuthors(scholarsData?.scholars)
    }, [scholarsData])

    const {
        request: requestCategories, 
        data: categoriesData,
      } = useFetch(BASE_URL+"/api/book-categories/", {
        headers: {
          'Content-Type': 'application/json',
        },
    })

    const { 
        updateData: updateBook,
        deleteData: deleteBook
    } = useFetch("", {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const categories = categoriesData?.book_categories || []

    const [selected, setSelected] = useState([])

    const { query, setSearch } = useSearch()

    useEffect(() => {
        setSearch("")
    }, [])

    useEffect(() => {
        setBooks(booksData?.books || [])
    }, [booksData])

    useEffect(() => {
        setFiltered(books?.filter(book => 
            book.name.toLowerCase().includes(query.toLowerCase()) &&
            (selected.length === 0 || book.categories.some(bookCategoryId =>
                selected.some(selectedCategory =>
                    selectedCategory.id === bookCategoryId
                )
            ))
        ))
    }, [books, query, selected])

    const handleSave = async (updatedData) => {
        if (modalMode === "edit" && selectedBook) {
            const url = BASE_URL+`/api/books/${selectedBook.id}/`;
            try {
                await updateBook(url, updatedData, { token: localStorage.getItem("accessToken") });
                setIsModalOpen(false)
                setSelectedBook(null)
                await requestBooks()
            } catch (err) {
                console.error("Error during update book: ", err)
            }
        } else if (modalMode === "add") {
            try {
                const newBook = await addBooks(
                    BASE_URL+"/api/books/",
                    updatedData,
                    { token: localStorage.getItem("accessToken") })
                setIsModalOpen(false)
                setModalMode("")
                setBooks(newBook?.books)
            } catch (err) {
                console.error("Error during adding scholar: ", err)
            }
        } else if (modalMode === "delete") {
            try {
                const url = BASE_URL+`/api/books/${selectedBook.id}/`;
                await deleteBook(url, { token: localStorage.getItem("accessToken") })
                setIsModalOpen(false)
                setSelectedBook(null)
                await requestBooks()
            } catch (err) {
                console.error("Error during delete book: ", err)
            }
        }
    };

    useEffect(() => {
        requestCategories()
    }, [])
    
    useEffect(() => {
        requestBooks()
        requestScholars()
    }, [isModalOpen])

    useEffect(() => {
        if (selectedBook && modalMode === "edit") {
            setIsModalOpen(true)
            setAuthors(authors)
        } else if (modalMode === "add") {
            setIsModalOpen(true)
            setAuthors(authors)
        } else if (selectedBook && modalMode === "delete") {
            setIsModalOpen(true)
        }
    }, [selectedBook, modalMode])

    return (
        <div className="books-page">
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    value={query}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <FilterElement 
                className={"filter-book"} 
                categories={categories} 
                selected={selected} 
                setSelected={setSelected} 
                filtertype={"Books"}
            />
            <main className="books-grid">
                {isAdmin &&
                    <div className="book-card-wrapper">
                        <button className="add-book-btn" onClick={() => setModalMode("add")}>
                            <div className="book-card">
                                <div className="book-cover">
                                    {<FontAwesomeIcon icon={faPlus}/>}
                                </div>
                                <hr />
                                <p>Add a book</p>
                                <p></p>
                            </div>
                        </button>
                    </div>
                }
                 {filtered.map((book, index) => {
                    return (
                        <div className="book-card-wrapper">
                            <BookCard 
                                key={index} 
                                id={book.id} 
                                name={book.name}
                                arabicName={book.arabic_name} 
                                author={book.author.name}
                            />
                            {isAdmin && (
                                <button className="delete-btn" onClick={() => {
                                    setSelectedBook(book)
                                    setModalMode("delete")
                                }}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                            )}
                            {isAdmin && (
                                <button className="edit-btn" onClick={() => {
                                    setSelectedBook(book)
                                    setModalMode("edit")
                                    }}>
                                    <FontAwesomeIcon icon={faGear} />
                                </button>
                            )}
                        </div>
                    )
                 })}
            </main>
            <EditModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false)
                    setModalMode("")
                }}
                editedElement={selectedBook}
                onSave={handleSave}
                type="book"
                modalMode={modalMode}
                authors={authors}
                categories={categories}
            />
        </div>
    )
}

export default BooksPage;