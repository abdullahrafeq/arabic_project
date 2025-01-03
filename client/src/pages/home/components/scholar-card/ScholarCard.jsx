import CustomLink from "../../../../components/custom-link/CustomLink"
import ZigZagCircle from "../../../../components/zig-zag-circle/ZigZagCircle"

const ScholarCard = ({ id, year_category, name, arabic_name, birth, death }) => {
    return (
        <CustomLink
            className="scholar-link"
            to={`/scholar-detail/${id}`} 
            children={<Card year_category={year_category} name={name} arabic_name={arabic_name} birth={birth} death={death}/>}
        />
    )
}

const Card = ({ name, arabic_name, year_category, birth, death }) => {
    return (
        <div className="scholar-card">
            <ZigZagCircle children={<>{arabic_name}</>}/>
            <hr />
            <p>{name}</p>
            <p>{year_category}</p>
            <p>{birth} - {death}</p>
        </div>
    )
}

export default ScholarCard;