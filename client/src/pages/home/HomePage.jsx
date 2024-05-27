import ScholarCard from "./components/scholar-card/ScholarCard";
import "./style.css"
import Sibawaihy from "../../assets/sibawaihy.jpg"
import BookCard from "./components/book-card/BookCard";
import AlKitab from "../../assets/alkitab.jpg"
import Quote from "./components/quote/Quote";

const HomePage = () => {

    return (
        <div className="home-page">
            <div className="search">
                <h1>Learn About Our Scholars</h1>
                <input type="text" placeholder="Search..." />
            </div>
            <div className="scholars">
                <h1>Famous Scholars</h1>
                <div className="scholars-grid">
                    <ScholarCard img={Sibawaihy} birth={"148"} death={"180"} name={"Sibawaihy"}/>
                    <ScholarCard img={Sibawaihy} birth={"148"} death={"180"} name={"Sibawaihy"}/>
                    <ScholarCard img={Sibawaihy} birth={"148"} death={"180"} name={"Sibawaihy"}/>
                    <ScholarCard img={Sibawaihy} birth={"148"} death={"180"} name={"Sibawaihy"}/>
                    <ScholarCard img={Sibawaihy} birth={"148"} death={"180"} name={"Sibawaihy"}/>
                    <ScholarCard img={Sibawaihy} birth={"148"} death={"180"} name={"Sibawaihy"}/>
                    <ScholarCard img={Sibawaihy} birth={"148"} death={"180"} name={"Sibawaihy"}/>
                    <ScholarCard img={Sibawaihy} birth={"148"} death={"180"} name={"Sibawaihy"}/>
                </div>
            </div>
            <div className="books">
                <h1>Popular books</h1>
                <div className="books-grid">
                    <BookCard name={"Al-kitab"} author={"Sibawaihy"} img={AlKitab}/>
                    <BookCard name={"Al-kitab"} author={"Sibawaihy"} img={AlKitab}/>
                    <BookCard name={"Al-kitab"} author={"Sibawaihy"} img={AlKitab}/>
                    <BookCard name={"Al-kitab"} author={"Sibawaihy"} img={AlKitab}/>
                    <BookCard name={"Al-kitab"} author={"Sibawaihy"} img={AlKitab}/>
                    <BookCard name={"Al-kitab"} author={"Sibawaihy"} img={AlKitab}/>
                </div>
            </div>
            <div className="quotes">
                <h1>Inspirational Quotes</h1>
                <div className="quotes-card-container">
                    <Quote quote={"My quote"} author={"Sibawaihy"}/>
                    <Quote quote={"My quote"} author={"Sibawaihy"}/>
                    <Quote quote={"My quote"} author={"Sibawaihy"}/>
                    <Quote quote={"My quote"} author={"Sibawaihy"}/>
                </div>
            </div>
        </div>
    )
}

export default HomePage;