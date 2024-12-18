import ScholarCard from "../home/components/scholar-card/ScholarCard";
import FilterElement from "../../components/filter-element/FilterElement";
import "./style.css"
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import useSearch from "../../hooks/useSearch";
import EditModal from "../../components/modal/EditModal";
import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const ScholarsPage = () => {
    const { isAdmin } = useAuth()
    const [selectedScholar, setSelectedScholar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openEditModal = (scholar) => {
        setSelectedScholar(scholar);
        console.log(scholar)
    };
    
    const {
        request: requestScholars, 
        appendData: appendScholars, 
        data: scholarsData,
        errorStatus: errorStatusScholars
    } = useFetch("http://127.0.0.1:8000/api/scholars", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + localStorage.getItem('access'),
        },
    })

    const { updateData: updateScholar } = useFetch("", {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const {
        request: requestCategories, 
        data: categoriesData,
        errorStatus: errorStatusCategories
    } = useFetch("http://127.0.0.1:8000/api/scholar-year-categories", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + localStorage.getItem('access'),
        },
    })
    const scholars = scholarsData?.scholars || [];
    const categories = categoriesData?.scholar_year_categories || []

    const [selected, setSelected] = useState([])
    const { query, setSearch } = useSearch()

    const filteredScholars = scholars.filter(scholar => 
        scholar.name.toLowerCase().includes(query.toLowerCase()) &&
        (selected.length === 0 || selected.some(selectedCategory =>
                selectedCategory.id === scholar.year_category.id
            )
    ))

    const handleClose = async () => {
        setIsModalOpen(false)
        setSelectedScholar(null)
    }
    
    const handleSave = async (updatedData) => {
        if (!selectedScholar) return;
        console.log(updatedData)
        const url = `http://127.0.0.1:8000/api/scholars/${selectedScholar.id}`;
        try {

            await updateScholar(url, updatedData, { token: localStorage.getItem("accessToken") });
            setIsModalOpen(false);
            setSelectedScholar(null);
            await requestScholars()
        } catch (err) {
            console.error("Error during update scholar: ", err)
        }
    };

    useEffect(() => {
        requestCategories()
    }, [])

    useEffect(() => {
        requestScholars()
    }, [isModalOpen])

    useEffect(() => {
        if (selectedScholar) {
            setIsModalOpen(true);
        }
    }, [selectedScholar]);

    return (
        <div className="scholars-page">
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    value={query}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <FilterElement 
                className={"filter-scholar"} 
                categories={categories} 
                selected={selected} 
                setSelected={setSelected} 
                filtertype={"Scholars"}
            />
            <main className="scholars-grid">
                {filteredScholars.map((scholar, index) => {
                    return (
                        <div className="scholar-card-wrapper">
                            <ScholarCard 
                                key={index}
                                id={scholar.id}
                                birth={scholar.birth_year} 
                                death={scholar.death_year} 
                                name={scholar.name}
                                arabic_name={scholar.arabic_name}
                            />
                            {isAdmin && (
                                <button className="edit-btn" onClick={() => openEditModal(scholar)}>
                                    <FontAwesomeIcon icon={faGear} />
                                </button>
                            )}
                        </div>
                    )
                })}
            </main>
            <EditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                scholar={selectedScholar}
                onSave={handleSave}
            />
        </div>
    )
}



export default ScholarsPage;