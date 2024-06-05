import BookCard from "../home/components/book-card/BookCard";
import FilterElement from "../../components/filter-element/FilterElement";
import "./style.css"
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";

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

    useEffect(() => {
        requestBooks()
        requestCategories()
    }, [])


    return (
        <div className="books-page">
            <div className="search-container">
                <input type="text" placeholder="Search..." />
            </div>
            <FilterElement className={"filter-book"} categories={categories} filtertype={"Books"}/>
            <main className="books-grid">
                 {books?.map((book, index) => {
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