import CustomLink from "../../../../components/custom-link/CustomLink"
import ZigZagCircle from "../../../../components/zig-zag-circle/ZigZagCircle"

const ScholarCard = ({ id, year_category, name, arabic_name }) => {
    return (
        <CustomLink
            className="scholar-link"
            to={`/scholar-detail/${id}`} 
            children={<Card year_category={year_category} name={name} arabic_name={arabic_name}/>}
        />
    )
}

const Card = ({ name, arabic_name, year_category }) => {
    return (
        <div className="scholar-card">
            <ZigZagCircle children={<>{arabic_name}</>}/>
            <hr />
            <p>{name}</p>
            <p>{year_category}</p>
        </div>
    )
}

export default ScholarCard;