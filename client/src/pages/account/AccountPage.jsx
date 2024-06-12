import "./style.css"
import Sibawaihy from "../../assets/sibawaihy.jpg"
import Button from "../../components/button/Button"
import { useState } from "react"

const AccountPage = () => {
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    const handleUpdate = () => {

    } 

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
                                <label htmlFor="">Email</label>
                                <input 
                                    type="text" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </form>
                            <form action="">
                                <label htmlFor="">Username</label>
                                <input 
                                    type="text" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </form>
                            <form action="">
                                <label htmlFor="">Password</label>
                                <input 
                                    type="text" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </form>
                            <form action="">
                                <label htmlFor="">Confirm Password</label>
                                <input 
                                    type="text" 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </form>
                        </div>
                        <Button 
                            className="update-button" 
                            children={<>Update</>}
                            onClick={handleUpdate}
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AccountPage;