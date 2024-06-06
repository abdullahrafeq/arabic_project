import { useEffect, useState } from "react"
import Button from "../button/Button"

const FilterElement = ({className, categories, selected, setSelected, filtertype}) => {
    const [isDefault, setDefault] = useState(true)
    const [isClearAll, setClearAll] = useState(false)

    useEffect(() => {        
        console.log(selected)
    }, [selected])

    useEffect(() => {
        if (categories.length > 0) {
            setSelected(categories);
        }
    }, [categories]);

    
    const handleChange = (event, selectedCategory) => {
        const isChecked = event.target.checked
        if (isChecked) {
            if (isDefault) {
                setDefault(false)
                setSelected([selectedCategory])
            } else {
                setSelected((prev) => {
                    return [...prev, selectedCategory]
                })
            }
        } else {
            if (selected.length > 1) {
                setSelected((prev) => {
                    return prev.filter((category) => category != selectedCategory)
                })
            } else {
                setDefault(true)
                setSelected(categories)
            }
        }
    }

    const handleClearAll = () => {
        setClearAll(true)
        setTimeout(() => {
            setClearAll(false)
            setSelected(categories)
            setDefault(true)
        }, 10)
    }

    return (
        <aside className={className}>
            <h1>Filter {filtertype}</h1>
            <hr />
                <h2>{filtertype === "Books" ? <>Book</> : <>Scholar</>} categories</h2>
                <form className="category">
                    {categories.map((category, index) => {
                        return (
                            <label key={index} className="category-alternative">
                                <input 
                                    type="checkbox"
                                    key={index}
                                    onChange={(event) => handleChange(event, category)}
                                    checked={isClearAll ? false : undefined}
                                />
                                {category.name}
                            </label>                                
                        )
                    })}
                </form>
                <Button 
                    children={<>Clear All</>}
                    onClick={handleClearAll}
                />
        </aside>
    )
}

export default FilterElement;