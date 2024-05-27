import CustomLink from "../../../../components/custom-link/CustomLink"

const BookCard = ({id, img, name, author}) => {
    return (
        <CustomLink to={`/book-detail/${id}`} children={<Card img={img} name={name} author={author}/>}/>
    )
}

const Card = ({img, name, author}) => {
    return (
        <div className="book-card">
            <img src={img} alt="" />
            <hr />
            <p>{name}</p>
            <p>{author}</p>
        </div>
    )
}

export default BookCard;