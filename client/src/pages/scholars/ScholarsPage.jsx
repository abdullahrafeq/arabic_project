import ScholarCard from "../home/components/scholar-card/ScholarCard";
import FilterElement from "../../components/filter-element/FilterElement";
import "./style.css"
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const ScholarsPage = () => {

    const {
        request: requestScholars, 
        appendData: appendScholars, 
        data: {scholars = []} = {},
        errorStatus: errorStatusScholars
      } = useFetch("http://127.0.0.1:8000/api/scholars", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + localStorage.getItem('access'),
        },
    })

    const {
        request: requestCategories, 
        data: {scholar_year_categories: categories = []} = {},
        errorStatus: errorStatusCategories
      } = useFetch("http://127.0.0.1:8000/api/scholar-year-categories", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + localStorage.getItem('access'),
        },
    })

    const [selected, setSelected] = useState([])
    
    useEffect(() => {
        requestScholars()
        requestCategories()
    }, [])




    return (
        <div className="scholars-page">
            <div className="search-container">
                <input type="text" placeholder="Search..." />
            </div>
            <FilterElement className={"filter-scholar"} categories={categories} selected={selected} setSelected={setSelected} filtertype={"Scholars"}/>
            <main className="scholars-grid">
                {scholars.filter((scholar) =>
                    selected.some((category) =>
                        category.id === scholar.year_category.id
                    )
                ).map((scholar, index) => {
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