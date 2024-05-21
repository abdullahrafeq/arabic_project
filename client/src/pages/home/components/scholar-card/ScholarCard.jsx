const ScholarCard = ({img, birth, death, name}) => {
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