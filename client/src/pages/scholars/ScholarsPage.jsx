import ScholarCard from "../home/components/scholar-card/ScholarCard";
import Sibawaihy from "../../assets/sibawaihy.jpg"
import FilterElement from "../../components/filter-element/FilterElement";
import "./style.css"
import { useParams } from "react-router-dom";

const ScholarsPage = ({ scholars }) => {
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

    console.log(scholars)
    return (
        <div className="scholars-page">
            <div className="search-container">
                <input type="text" placeholder="Search..." />
            </div>
            <FilterElement className={"filter-scholar"} categories={categories} filtertype={"Scholars"}/>
            <main className="scholars-grid">
                {scholars?.map((scholar, index) => {
                    return (
                        <ScholarCard 
                            key={index}
                            id={scholar.id}
                            img={scholar.image} 
                            birth={scholar.birth_year} 
                            death={scholar.death_year} 
                            name={scholar.name}
                        />
                    )
                })}
            </main>
        </div>
    )
}



export default ScholarsPage;