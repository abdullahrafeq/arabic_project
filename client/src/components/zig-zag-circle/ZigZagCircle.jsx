import "./style.css"

const ZigZagCircle = ({ children }) => {
    return (
        <div className="box clipped">
            {children}
        </div>
    )
}

export default ZigZagCircle;