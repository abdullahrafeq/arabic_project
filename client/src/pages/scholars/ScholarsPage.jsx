import ScholarCard from "../home/components/scholar-card/ScholarCard";
import FilterElement from "../../components/filter-element/FilterElement";
import "./style.css"

const ScholarsPage = ({ scholarsData, scholarYearCategoriesData }) => {
    const scholars = scholarsData && scholarsData.scholars ? scholarsData.scholars : [];
    const categories = scholarYearCategoriesData && scholarYearCategoriesData.scholar_year_categories ? scholarYearCategoriesData.scholar_year_categories : []

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
                            birth={scholar.birth_year} 
                            death={scholar.death_year} 
                            name={scholar.name}
                            arabic_name={scholar.arabic_name}
                        />
                    )
                })}
            </main>
        </div>
    )
}



export default ScholarsPage;