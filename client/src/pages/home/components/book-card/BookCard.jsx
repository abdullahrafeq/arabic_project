import CustomLink from "../../../../components/custom-link/CustomLink"
import "./style.css"

const BookCard = ({id, name, arabicName, author}) => {
    return (
        <CustomLink to={`/book-detail/${id}`} children={<Card name={name} arabicName={arabicName} author={author}/>}/>
    )
}

const Card = ({name, arabicName, author}) => {
    return (
        <div className="book-card">
            <div className="book-cover">
                {arabicName}
            </div>
            <hr />
            <p>{name}</p>
            <p>{author}</p>
        </div>
    )
}

export default BookCard;