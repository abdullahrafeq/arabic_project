const Quote = ({ quote, author }) => {
    return (
        <div class="quote-container">
            <p className="quote"><strong>{quote}</strong></p>
            <p className="author">- <em>{author}</em></p>
        </div>
    )
}

export default Quote;