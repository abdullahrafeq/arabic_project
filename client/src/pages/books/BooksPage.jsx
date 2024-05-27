import BookCard from "../home/components/book-card/BookCard";
import FilterElement from "../../components/filter-element/FilterElement";
import "./style.css"

const BooksPage = ({ books }) => {
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
                            img={book.image} 
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