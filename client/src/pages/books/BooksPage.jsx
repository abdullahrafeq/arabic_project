import BookCard from "../home/components/book-card/BookCard";
import FilterElement from "../../components/filter-element/FilterElement";
import "./style.css"
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import useSearch from "../../hooks/useSearch";
import useAuth from "../../hooks/useAuth";
import EditModal from "../../components/modal/EditModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const BooksPage = () => {
    const { isAdmin } = useAuth()
    const [selectedBook, setSelectedBook] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        request: requestBooks, 
        appendData: appendBooks, 
        data: booksData,
        errorStatus: errorStatusBooks
      } = useFetch("http://127.0.0.1:8000/api/books", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + localStorage.getItem('access'),
        },
    })

    
    const {
        request: requestCategories, 
        data: categoriesData,
        errorStatus: errorStatusCategories
      } = useFetch("http://127.0.0.1:8000/api/book-categories", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + localStorage.getItem('access'),
        },
    })

    const { updateData: updateBook } = useFetch("", {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const openEditModal = (book) => {
        setSelectedBook(book);
        console.log(book)
    };

    const books = booksData?.books || []
    const categories = categoriesData?.book_categories || []

    const [selected, setSelected] = useState([])

    const { query, setSearch } = useSearch()

    const filteredBooks = books.filter(book => 
        book.name.toLowerCase().includes(query.toLowerCase()) &&
        (selected.length === 0 || book.categories.some(bookCategory =>
            selected.some(selectedCategory =>
                selectedCategory.id === bookCategory.id
            )
        ))
    )

    const handleSave = async (updatedData) => {
        if (!selectedBook) return;
        console.log(updatedData)
        const url = `http://127.0.0.1:8000/api/books/${selectedBook.id}`;
        try {

            await updateBook(url, updatedData, { token: localStorage.getItem("accessToken") });
            setIsModalOpen(false);
            setSelectedBook(null);
            await requestBooks()
        } catch (err) {
            console.error("Error during update book: ", err)
        }
    };

    useEffect(() => {
        requestCategories()
    }, [])

    
    useEffect(() => {
        requestBooks()
    }, [isModalOpen])

    useEffect(() => {
        if (selectedBook) {
            setIsModalOpen(true);
            console.log("here")
        }
    }, [selectedBook])

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
                 {filteredBooks.map((book, index) => {
                    return (
                        <div className="book-card-wrapper">
                            <BookCard 
                                key={index} 
                                id={book.id} 
                                img={"http://127.0.0.1:8000/"+book.image_url} 
                                name={book.name} 
                                author={book.author.name}
                            />
                            {isAdmin && (
                                <button className="edit-btn" onClick={() => openEditModal(book)}>
                                    <FontAwesomeIcon icon={faGear} />
                                </button>
                            )}
                        </div>
                    )
                 })}
            </main>
            <EditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                editedElement={selectedBook}
                onSave={handleSave}
                type="book"
            />
        </div>
    )
}

export default BooksPage;