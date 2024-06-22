import "./style.css"
import Sibawaihy from "../../assets/sibawaihy.jpg"
import Button from "../../components/button/Button"
import { useEffect, useState } from "react"
import useAuth from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import useCurrentUser from "../../hooks/useCurrentUser"

const AccountPage = () => {
    const { isLoggedIn } = useAuth()
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [oldPassword, setOldPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [user, setUser] = useState(null)
    
    const navigate = useNavigate()
    const { currentUser, requestUser, updateUser } = useCurrentUser()

    const handleUpdate = () => {
        updateUser("http://localhost:8000/api/current-user/", {
            email: email,
            username: username,
            old_password: oldPassword,
            new_password: newPassword
        })
    }

    const handleUpdateValues = (user) => {
        console.log(user)
        setUser(user?.user)
        setUsername(user?.username)
        setEmail(user?.email)
        setOldPassword("")
        setNewPassword("")
    }

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        }
    }, [])

    useEffect(() => {
        requestUser()
        console.log(user)
        if (currentUser) {
            console.log(currentUser?.user)
            handleUpdateValues(currentUser?.user)
        }
    }, [user])

    return (
        <div className="account-page">
            <section className="account">
                <h1>Account Management</h1>
                <div className="account-settings-container">
                    <div className="settings">
                        <div>
                            <img src={Sibawaihy} alt="" />
                            <strong>{user?.username}</strong>
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
                                <label htmlFor="">Old Password</label>
                                <input 
                                    type="text" 
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </form>
                            <form action="">
                                <label htmlFor="">New Password</label>
                                <input 
                                    type="text" 
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
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