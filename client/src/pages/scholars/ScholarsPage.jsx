import ScholarCard from "../home/components/scholar-card/ScholarCard";
import Sibawaihy from "../../assets/sibawaihy.jpg"
import FilterElement from "../../components/filter-element/FilterElement";
import "./style.css"

const ScholarsPage = () => {
    const categories = [
        {
            name: "cat1",
            alternatives: ["alt1", "alt2", "alt3", "alt4", "alt5"]
        },
        {
            name: "cat2",
            alternatives: ["alt1", "alt2", "alt3"]
        },
        {
            name: "cat3",
            alternatives: ["alt1", "alt2", "alt3", "alt4"]
        },
        
    ]
    return (
        <div className="scholars-page">
            <div className="search-container">
                <input type="text" placeholder="Search..." />
            </div>
            <FilterElement className={"filter-scholar"} categories={categories} filtertype={"Scholars"}/>
            <main className="scholars-grid">
                <ScholarCard img={Sibawaihy} birth={"148"} death={"180"} name={"Sibawaihy"}/>
                <ScholarCard img={Sibawaihy} birth={"148"} death={"180"} name={"Sibawaihy"}/>
                <ScholarCard img={Sibawaihy} birth={"148"} death={"180"} name={"Sibawaihy"}/>
                <ScholarCard img={Sibawaihy} birth={"148"} death={"180"} name={"Sibawaihy"}/>
                <ScholarCard img={Sibawaihy} birth={"148"} death={"180"} name={"Sibawaihy"}/>
                <ScholarCard img={Sibawaihy} birth={"148"} death={"180"} name={"Sibawaihy"}/>
                <ScholarCard img={Sibawaihy} birth={"148"} death={"180"} name={"Sibawaihy"}/>
                <ScholarCard img={Sibawaihy} birth={"148"} death={"180"} name={"Sibawaihy"}/>
                <ScholarCard img={Sibawaihy} birth={"148"} death={"180"} name={"Sibawaihy"}/>
                <ScholarCard img={Sibawaihy} birth={"148"} death={"180"} name={"Sibawaihy"}/>
                <ScholarCard img={Sibawaihy} birth={"148"} death={"180"} name={"Sibawaihy"}/>
                <ScholarCard img={Sibawaihy} birth={"148"} death={"180"} name={"Sibawaihy"}/>
                <ScholarCard img={Sibawaihy} birth={"148"} death={"180"} name={"Sibawaihy"}/>
            </main>
        </div>
    )
}



export default ScholarsPage;