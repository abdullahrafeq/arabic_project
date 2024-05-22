const FilterElement = ({className, categories, filtertype}) => {
    return (
        <aside className={className}>
            <h1>Filter {filtertype}</h1>
            <hr />
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

export default FilterElement;