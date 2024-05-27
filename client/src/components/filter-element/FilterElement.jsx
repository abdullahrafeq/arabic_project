const FilterElement = ({className, categories, filtertype}) => {
    return (
        <aside className={className}>
            <h1>Filter {filtertype}</h1>
            <hr />
                <h2>Book categories</h2>
                <form className="category">
                    {categories.map((category, index) => {
                        return (
                            <label key={index} className="category-alternative">
                                <input 
                                    type="checkbox"
                                    key={index}
                                />
                                {category.name}
                            </label>                                
                        )
                    })}
                </form>
        </aside>
    )
}

export default FilterElement;