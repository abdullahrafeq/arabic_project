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
    const [fadeOut, setFadeOut] = useState(false); // State to control fade-out effect

    const navigate = useNavigate()
    const { currentUser, requestCurrentUser, updateCurrentUser, errorStatusCurrentUser, isSuccessfulUpdate } = useCurrentUser()
    const handleUpdate = () => {
        updateCurrentUser("http://localhost:8000/api/current-user/", {
            username: username || currentUser?.user?.username, 
            email: email || currentUser?.user?.email,         
            old_password: oldPassword,
            new_password: newPassword
        })
    }

    const handleUpdateValues = (user) => {
        console.log(user)
        if (isSuccessfulUpdate) {
            setOldPassword("");
            setNewPassword("");
        }
    }

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        }
    }, [])

    useEffect(() => {
        if (!currentUser) {
            requestCurrentUser();
        } else {
            setEmail(currentUser?.user?.email);
            setUsername(currentUser?.user?.username);
        }
    }, [currentUser, requestCurrentUser]);

    useEffect(() => {
        if (isSuccessfulUpdate) {
            setFadeOut(false); // Reset fade-out state
            setTimeout(() => setFadeOut(true), 0); // Trigger fade-out after rendering
            setTimeout(() => handleUpdateValues(currentUser), 0); // Clear passwords after fade-out
        }
    }, [isSuccessfulUpdate, currentUser]);

    return (
        <div className="account-page">
            <section className="account">
                <h1>Account Management</h1>
                <div className="account-settings-container">
                    <div className="settings">
                        <div>
                            <img src={Sibawaihy} alt="" />
                            <strong>{currentUser?.user?.username}</strong>
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
                                    value={currentUser?.user?.email}
                                    disabled
                                />
                            </form>
                            <form action="">
                                <label htmlFor="">Username</label>
                                <input 
                                    type="text" 
                                    value={currentUser?.user?.username}
                                    disabled
                                />
                            </form>
                            <form action="">
                                <label htmlFor="">Old Password</label>
                                <input 
                                    type="text" 
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                                {!isSuccessfulUpdate && 
                                    <p>{errorStatusCurrentUser?.old_password}</p>
                                }
                            </form>
                            <form action="">
                                <label htmlFor="">New Password</label>
                                <input 
                                    type="text" 
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                {!isSuccessfulUpdate && 
                                    <p>{errorStatusCurrentUser?.new_password}</p>
                                }
                            </form>
                        </div>
                        {isSuccessfulUpdate && 
                            <div className={`success-message ${fadeOut ? "fade-out" : ""}`}>
                                Successful update
                            </div>              
                        }
                        <Button 
                            className="update-button" 
                            children={<>Update</>}
                            onClick={() => {
                                handleUpdate()
                                handleUpdateValues(currentUser)
                            }}
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AccountPage;