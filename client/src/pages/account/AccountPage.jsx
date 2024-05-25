import "./style.css"
import Sibawaihy from "../../assets/sibawaihy.jpg"
import Button from "../../components/button/Button"

const AccountPage = () => {
    return (
        <div className="account-page">
            <section className="account">
                <h1>Account Management</h1>
                <div className="account-settings-container">
                    <div className="settings">
                        <div>
                            <img src={Sibawaihy} alt="" />
                            <strong>Abdullah Rafeq</strong>
                            <em>Student of the Arabic Language</em>
                        </div>
                        <ul>
                            <li>
                                <p>Favourite scholars</p>
                                <p>3</p>
                            </li>
                            <li>
                                <p>Favourite books</p>
                                <p>3</p>
                            </li>
                        </ul>
                    </div>
                    <div className="manage-settings">
                        <h2>Account Settings</h2>
                        <div className="forms-container">
                            <form action="">
                                <label htmlFor="">First Name</label>
                                <input type="text" />
                            </form>
                            <form action="">
                                <label htmlFor="">Last Name</label>
                                <input type="text" />
                            </form>
                            <form action="">
                                <label htmlFor="">Email</label>
                                <input type="text" />
                            </form>
                            <form action="">
                                <label htmlFor="">Username</label>
                                <input type="text" />
                            </form>
                        </div>
                        <Button className="update-button" children={<>Update</>}/>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AccountPage;