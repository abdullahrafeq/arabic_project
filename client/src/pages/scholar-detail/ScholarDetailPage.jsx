import "./style.css"
import Sibawaihy from "../../assets/sibawaihy.jpg"
import Button from "../../components/button/Button"
import HeartIcon from "../../components/heart/HeartIcon"
const ScholarDetailPage = () => {
    return (
        <main className="scholar-details-page">
            <div className="scholar-details">
                <div className="image-container">
                    <img src={Sibawaihy} alt="" />
                </div>
                <div className="description-container">
                    <div className="title-container">
                        <h2>Sibawaihy</h2>
                        <Button className="add-scholar" children={<HeartIcon/>}/>
                    </div>
                    <p><strong>Born:</strong> 760 AD</p>
                    <p><strong>Died:</strong> 796 AD</p>
                    <p><strong>Specialized Science:</strong> Nahw (Arabic Grammar)</p>
                    <p>Sibawaihy was a renowned Persian scholar of Arabic grammar, whose works have significantly influenced the field. His seminal work, "Kitab Sibawaih," is considered one of the most important contributions to Arabic linguistics, laying the foundations for Arabic syntax and grammar. Despite his early death, Sibawaihy's legacy endures in the study of the Arabic language.</p>
                </div>

            </div>
        </main>        
    )
}

export default ScholarDetailPage;