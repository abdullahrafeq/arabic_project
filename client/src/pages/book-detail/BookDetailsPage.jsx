import "./style.css"
import Alkitab from "../../assets/alkitab.jpg"
import CustomLink from "../../components/custom-link/CustomLink"
import Button from "../../components/button/Button"

const BookDetailsPage = () => {
    return (
        <main className="book-details-page">
            <div className="book-details">
                <div className="image-container">
                    <img src={Alkitab} alt="" />
                </div>
                <div className="description-container">
                    <h2>Al Kitab</h2>
                    <p>Author: <em><CustomLink to="/scholar-detail" children={<>Sibawaihy</>}/></em></p>
                    <strong>Reviews: 27</strong>
                    <hr />
                    <p>Description of the book...</p>
                </div>
            </div>
            <h2 className="reviews-title">Reviews</h2>
            <div className="reviews-container">
                <div className="previous-reviews">
                    <Review/>
                    <Review/>
                    <Review/>
                    <Review/>
                    <Review/>
                    <Review/>
                </div>
                <form action="">
                    <label htmlFor="">Submit review:</label>
                    <textarea name="" id="" rows={5}></textarea>
                </form>
                <Button children={<>Submit</>}/>
            </div>
        </main>        
    )
}

const Review = () => {
    return (
        <div className="review">
            <p>Username</p>
            <p>Review...</p>
            <hr />
        </div>
    )
}

export default BookDetailsPage;