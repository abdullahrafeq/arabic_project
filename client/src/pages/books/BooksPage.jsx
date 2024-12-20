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
import ZigZagCircle from "../../components/zig-zag-circle/ZigZagCircle";

const BooksPage = () => {
    const { isAdmin } = useAuth()
    const [selectedBook, setSelectedBook] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("")
    const [books, setBooks] = useState([])
    const [filtered, setFiltered] = useState([])
    const [authors, setAuthors] = useState([])

    const {
        request: requestBooks, 
        appendData: addBooks, 
        data: booksData,
        errorStatus: errorStatusBooks
      } = useFetch("http://127.0.0.1:8000/api/books/", {
        headers: {
          'Content-Type': 'application/json',
        },
    })

    const {
        request: requestScholars, 
        data: scholarsData,
    } = useFetch("http://127.0.0.1:8000/api/scholars/", {
        headers: {
          'Content-Type': 'application/json',
        },
    })



    useEffect(() => {
        console.log(scholarsData)
        setAuthors(scholarsData?.scholars)
    }, [scholarsData])

    useEffect(() => {
        console.log(authors)
    }, [authors])

    const {
        request: requestCategories, 
        data: categoriesData,
        errorStatus: errorStatusCategories
      } = useFetch("http://127.0.0.1:8000/api/book-categories/", {
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
            const url = `http://127.0.0.1:8000/api/books/${selectedBook.id}/`;
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
                console.log(updatedData)
                const newBook = await addBooks(
                    "http://127.0.0.1:8000/api/books/",
                    updatedData,
                    { token: localStorage.getItem("accessToken") })
                setIsModalOpen(false)
                setModalMode("")
                console.log("newBook: ", newBook)
                console.log("newBook inside: ", newBook?.books)
                setBooks(newBook?.books)
            } catch (err) {
                console.error("Error during adding scholar: ", err)
            }
        } else if (modalMode === "delete") {
            try {
                const url = `http://127.0.0.1:8000/api/books/${selectedBook.id}/`;
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
                        <button className="add-scholar-btn" onClick={() => setModalMode("add")}>
                            <div className="scholar-card">
                                <ZigZagCircle children={<FontAwesomeIcon icon={faPlus}/>}/>
                                <hr />
                                <p>Add book</p>
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