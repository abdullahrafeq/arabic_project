import BookCard from "../home/components/book-card/BookCard";
import FilterElement from "../../components/filter-element/FilterElement";
import AlKitab from "../../assets/alkitab.jpg"
import "./style.css"
import { useState, useEffect } from "react";

const BooksPage = () => {
    const categories = [
        {
            name: "cat1",
            alternatives: ["alt1", "alt2", "alt3", "alt4", "alt5"]
        },
        {
            name: "cat2",
            alternatives: ["alt1", "alt2", "alt3"]
        },
        {
            name: "cat3",
            alternatives: ["alt1", "alt2", "alt3", "alt4"]
        },
        
    ]

    const [books, setBooks] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/books/")
        .then((response) => response.json())
        .then(data => {
            setBooks(data.books)
            console.log(data.books)
        })
        .catch((err) => {
            console.log("Error fetching books: " + err)
        })
    }, [])

    return (
        <div className="books-page">
            <div className="search-container">
                <input type="text" placeholder="Search..." />
            </div>
            <FilterElement className={"filter-book"} categories={categories} filtertype={"Books"}/>
            <main className="books-grid">
                {/**
                 * 
                <BookCard img={AlKitab} name={"Al-kitab"} author={"Sibawaihy"}/>
                <BookCard img={AlKitab} name={"Al-kitab"} author={"Sibawaihy"}/>
                <BookCard img={AlKitab} name={"Al-kitab"} author={"Sibawaihy"}/>
                <BookCard img={AlKitab} name={"Al-kitab"} author={"Sibawaihy"}/>
                <BookCard img={AlKitab} name={"Al-kitab"} author={"Sibawaihy"}/>
                <BookCard img={AlKitab} name={"Al-kitab"} author={"Sibawaihy"}/>
                 */}
                 {books?.map((book, index) => {
                    return (
                        <BookCard key={index} img={book.image} name={book.name} author={book.author}/>
                    )
                 })}
            </main>
        </div>
    )
}

export default BooksPage;