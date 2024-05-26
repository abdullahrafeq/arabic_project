import "./style.css"
import Sibawaihy from "../../assets/sibawaihy.jpg"
import Button from "../../components/button/Button"
import CustomLink from "../../components/custom-link/CustomLink"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const FavouriteScholarsPage = () => {
    return (
        <main className="favourite-scholars-page">
            <h2>Favourite Scholars</h2>
            <section className="grid-container">
                <ScholarCard img={Sibawaihy} name={"Sibawaihy"}/>
                <ScholarCard img={Sibawaihy} name={"Sibawaihy"}/>
                <ScholarCard img={Sibawaihy} name={"Sibawaihy"}/>
                <ScholarCard img={Sibawaihy} name={"Sibawaihy"}/>
                <ScholarCard img={Sibawaihy} name={"Sibawaihy"}/>
                <ScholarCard img={Sibawaihy} name={"Sibawaihy"}/>
                <ScholarCard img={Sibawaihy} name={"Sibawaihy"}/>
                <ScholarCard img={Sibawaihy} name={"Sibawaihy"}/>
                <ScholarCard img={Sibawaihy} name={"Sibawaihy"}/>
                <ScholarCard img={Sibawaihy} name={"Sibawaihy"}/>
                <ScholarCard img={Sibawaihy} name={"Sibawaihy"}/>
                <ScholarCard img={Sibawaihy} name={"Sibawaihy"}/>
                <ScholarCard img={Sibawaihy} name={"Sibawaihy"}/>
                <ScholarCard img={Sibawaihy} name={"Sibawaihy"}/>
                <ScholarCard img={Sibawaihy} name={"Sibawaihy"}/>
            </section>
        </main>
    )
}


const ScholarCard = ({ img, name }) => {
    return (
        <Content img={img} name={name}/>
    )
}

const Content = ({ img, name }) => {
    return (
        <div className="card">
            <CustomLink to="/scholar-detail" children={
            <div className="link-container">
                <img src={img} alt="" />
                <p>{name}</p>
            </div>
            }/>
            <Button className="remove-button" children={<FontAwesomeIcon icon={faX}/>}/>
        </div>
    )
}

export default FavouriteScholarsPage;