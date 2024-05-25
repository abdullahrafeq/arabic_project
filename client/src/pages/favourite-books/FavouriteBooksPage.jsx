import "./style.css"
import Alkitab from "../../assets/alkitab.jpg"
import Button from "../../components/button/Button"
import CustomLink from "../../components/custom-link/CustomLink"

const FavouriteBooksPage = () => {
    return (
        <main className="favourite-books-page">
            <h2>Favourite Books</h2>
            <section className="grid-container">
                <BookCard img={Alkitab} name={"Al-kitab"}/>
                <BookCard img={Alkitab} name={"Al-kitab"}/>
                <BookCard img={Alkitab} name={"Al-kitab"}/>
                <BookCard img={Alkitab} name={"Al-kitab"}/>
                <BookCard img={Alkitab} name={"Al-kitab"}/>
                <BookCard img={Alkitab} name={"Al-kitab"}/>
                <BookCard img={Alkitab} name={"Al-kitab"}/>
                <BookCard img={Alkitab} name={"Al-kitab"}/>
                <BookCard img={Alkitab} name={"Al-kitab"}/>
                <BookCard img={Alkitab} name={"Al-kitab"}/>
                <BookCard img={Alkitab} name={"Al-kitab"}/>
                <BookCard img={Alkitab} name={"Al-kitab"}/>
                <BookCard img={Alkitab} name={"Al-kitab"}/>
            </section>
        </main>
    )
}

const BookCard = ({ img, name }) => {
    return (
        <Content img={img} name={name}/>
    )
}

const Content = ({ img, name }) => {
    return (
        <div className="card">
            <CustomLink to="/book-detail" children={
            <div className="link-container">
                <img src={img} alt="" />
                <p>{name}</p>
            </div>
            }/>
            <Button children={<>Remove</>}/>
        </div>
    )
}

export default FavouriteBooksPage;