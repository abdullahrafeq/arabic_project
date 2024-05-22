const BookCard = ({img, name, author}) => {
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