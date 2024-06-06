import Button from "../button/Button"
import useFilter from "../../hooks/useFilter"

const FilterElement = ({className, categories, selected, setSelected, filtertype}) => {
    const {isClearAll, handleChange, handleClearAll } = useFilter(categories, selected, setSelected)
    
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