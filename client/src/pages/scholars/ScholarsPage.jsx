import ScholarCard from "../home/components/scholar-card/ScholarCard";
import FilterElement from "../../components/filter-element/FilterElement";
import "./style.css"
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import useSearch from "../../hooks/useSearch";
import EditModal from "../../components/modal/EditModal";
import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ZigZagCircle from "../../components/zig-zag-circle/ZigZagCircle";
import { useBaseUrl } from "../../contexts/BaseUrlContext";

const ScholarsPage = () => {
    const { isAdmin } = useAuth()
    const [selectedScholar, setSelectedScholar] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState("")
    const [scholars, setScholars] = useState([])
    const [filtered, setFiltered] = useState([])
    const BASE_URL = useBaseUrl()

    const {
        request: requestScholars, 
        appendData: addScholars,
        data: scholarsData,
    } = useFetch(BASE_URL+"/api/scholars/", {
        headers: {
          'Content-Type': 'application/json',
        },
    })

    const { 
        updateData: updateScholar,         
        deleteData: deleteScholar, 
    } = useFetch("", {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const {
        request: requestCategories, 
        data: categoriesData,
    } = useFetch(BASE_URL+"/api/scholar-year-categories/", {
        headers: {
          'Content-Type': 'application/json',
        },
    })
    const categories = categoriesData?.scholar_year_categories || []

    const [selected, setSelected] = useState([])
    const { query, setSearch } = useSearch()
    
    
    const {
        request: requestBookCategories, 
        data: bookCategoriesData,
    } = useFetch(BASE_URL+"/api/book-categories/", {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    
    useEffect(() => {
        setSearch("")
        requestBookCategories()
    }, [])

    const book_categories = bookCategoriesData?.book_categories || []

    useEffect(() => {
        setScholars(scholarsData?.scholars || [])
    }, [scholarsData])

    useEffect(() => {
        setFiltered(scholars?.filter(scholar => 
            scholar?.name?.toLowerCase().includes(query.toLowerCase()) &&
            (selected.length === 0 || selected.some(selectedCategory =>
                    selectedCategory.id === scholar.year_category.id
                )
        )))
    }, [scholars, query, selected])
    
    const handleSave = async (updatedData) => {
        if (modalMode === "edit" && selectedScholar) {
            const url = BASE_URL+`/api/scholars/${selectedScholar.id}/`;
            try {
                await updateScholar(url, updatedData, { token: localStorage.getItem("accessToken") });
                setIsModalOpen(false);
                setSelectedScholar(null);
                await requestScholars()
            } catch (err) {
                console.error("Error during update scholar: ", err)
            }
        } else if (modalMode === "add") {
            try {
                const newScholar = await addScholars(
                    BASE_URL+"/api/scholars/",
                    updatedData,
                    { token: localStorage.getItem("accessToken") })
                setIsModalOpen(false)
                setModalMode("")
                setScholars(newScholar?.scholars)
            } catch (err) {
                console.error("Error during adding scholar: ", err)
            }
        } else if (modalMode === "delete") {
            try {
                const url = BASE_URL+`/api/scholars/${selectedScholar.id}/`;
                await deleteScholar(url, { token: localStorage.getItem("accessToken") })
                setIsModalOpen(false)
                setSelectedScholar(null)
                await requestScholars()
            } catch (err) {
                console.error("Error during delete scholar: ", err)
            }
        }
    }

    useEffect(() => {
        requestCategories()
    }, [])

    useEffect(() => {
        requestScholars()
    }, [isModalOpen])
    


    useEffect(() => {
        if (selectedScholar && modalMode === "edit") {
            setIsModalOpen(true)
        } else if (modalMode === "add") {
            setIsModalOpen(true)
        } else if (selectedScholar && modalMode === "delete") {
            setIsModalOpen(true)
        }
    }, [selectedScholar, modalMode]);

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
                {isAdmin && 
                    <div className="scholar-card-wrapper">
                        <button className="add-scholar-btn" onClick={() => setModalMode("add")}>
                            <div className="scholar-card">
                                <ZigZagCircle children={<FontAwesomeIcon icon={faPlus}/>}/>
                                <hr />
                                <p>Add scholar</p>
                                <p></p>
                            </div>
                        </button>
                    </div>
                }
                {filtered.map((scholar, index) => {
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
                                <button className="delete-btn" onClick={() => {
                                        setSelectedScholar(scholar)
                                        setModalMode("delete")
                                    }} >
                                    <FontAwesomeIcon icon={faTrashCan}/>
                                </button>
                            )}
                            {isAdmin && (
                                <button className="edit-btn" onClick={() => {
                                        setSelectedScholar(scholar)
                                        setModalMode("edit")
                                    }}>
                                    <FontAwesomeIcon icon={faGear} />
                                </button>
                            )}
                        </div>
                    )
                })}
            </main>
            <EditModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false)
                    setModalMode("")
                }}
                editedElement={selectedScholar}
                onSave={handleSave}
                type="scholar"
                modalMode={modalMode}
                categories={book_categories}
            />
        </div>
    )
}



export default ScholarsPage;