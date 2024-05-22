import ScholarCard from "../home/components/scholar-card/ScholarCard";
import Sibawaihy from "../../sibawaihy.jpg"
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
            <div className="search-container">search</div>   
            <FilterElement className={"filter-scholar"} categories={categories}/>
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

const FilterElement = ({className, categories}) => {
    return (
        <aside className={className}>
            {categories.map((category, index) => {
                return (
                    <>
                        <h2>{category.name}</h2>
                        <form className="category" key={index}>
                            {category.alternatives.map((alternative, index) => {
                                return (
                                    <label key={index} className="category-alternative">
                                        <input 
                                            type="checkbox"
                                            key={index}
                                        />
                                        {alternative}
                                    </label>                                
                                )
                            })}
                        </form>
                    </>
                )
            })}
        </aside>
    )
}

export default ScholarsPage;