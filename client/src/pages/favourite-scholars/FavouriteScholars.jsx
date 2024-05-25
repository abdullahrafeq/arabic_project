import "./style.css"
import Sibawaihy from "../../assets/sibawaihy.jpg"
import Button from "../../components/button/Button"
import CustomLink from "../../components/custom-link/CustomLink"

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
        <CustomLink to="/scholar-detail" children={<Content img={img} name={name}/>}/>
    )
}

const Content = ({ img, name }) => {
    return (
        <div className="card">
            <img src={img} alt="" />
            <p>{name}</p>
            <Button children={<>Remove</>}/>
        </div>
    )
}

export default FavouriteScholarsPage;