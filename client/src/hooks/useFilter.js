import { useEffect, useState } from "react"
const useFilter = (categories, selected, setSelected) => {

    const [isDefault, setDefault] = useState(true)
    const [isClearAll, setClearAll] = useState(false)

    useEffect(() => {
        if (categories.length > 0) {
            setSelected(categories);
        }
    }, [categories, setSelected]);

    
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
    return { isClearAll, handleChange, handleClearAll }
}

export default useFilter;