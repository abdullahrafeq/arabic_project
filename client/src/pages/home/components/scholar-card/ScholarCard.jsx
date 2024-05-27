import CustomLink from "../../../../components/custom-link/CustomLink"
import ZigZagCircle from "../../../../components/zig-zag-circle/ZigZagCircle"

const ScholarCard = ({ id, birth, death, name, arabic_name }) => {
    return (
        <CustomLink
            className="scholar-link"
            to={`/scholar-detail/${id}`} 
            children={<Card birth={birth} death={death} name={name} arabic_name={arabic_name}/>}
        />
    )
}

const Card = ({ birth, death, name, arabic_name }) => {
    return (
        <div className="scholar-card">
            <ZigZagCircle children={<>{arabic_name}</>}/>
            <hr />
            <p>{name}</p>
            <p>{birth} - {death}</p>
        </div>
    )
}

export default ScholarCard;