import BookCard from "../home/components/book-card/BookCard";
import FilterElement from "../../components/filter-element/FilterElement";
import "./style.css"
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import useSearch from "../../hooks/useSearch";

const BooksPage = () => {
    const {
        request: requestBooks, 
        appendData: appendBooks, 
        data: {books = []} = {},
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
        data: {book_categories: categories = []} = {},
        errorStatus: errorStatusCategories
      } = useFetch("http://127.0.0.1:8000/api/book-categories", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + localStorage.getItem('access'),
        },
    })

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

    useEffect(() => {
        requestBooks()
        requestCategories()
    }, [])

    useEffect(() => {
        console.log(query)
    }, [query])

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
                        <BookCard 
                            key={index} 
                            id={book.id} 
                            img={"http://127.0.0.1:8000/"+book.image_url} 
                            name={book.name} 
                            author={book.author.name}
                        />
                    )
                 })}
            </main>
        </div>
    )
}

export default BooksPage;