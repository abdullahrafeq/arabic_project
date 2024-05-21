import ScholarCard from "./components/scholar-card/ScholarCard";
import "./style.css"
import Sibawaihy from "../../sibawaihy.jpg"

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
            </div>
            <div className="quotes">
                <h1>Inspirational Quotes</h1>
            </div>
        </div>
    )
}

export default HomePage;