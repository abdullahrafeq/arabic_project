import CustomLink from "../../../../components/custom-link/CustomLink"

const ScholarCard = ({img, birth, death, name}) => {
    return (
        <CustomLink to="/scholar-detail" children={<Card img={img} birth={birth} death={death} name={name}/>}/>
    )
}

const Card = ({img, birth, death, name}) => {
    return (
        <div className="scholar-card">
            <img src={img} alt="" />
            <hr />
            <p>{name}</p>
            <p>{birth} - {death}</p>
        </div>
    )
}

export default ScholarCard;