import "./style.css"
import Sibawaihy from "../../assets/sibawaihy.jpg"
import Button from "../../components/button/Button"
import { useEffect, useState } from "react"
import useAuth from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import useCurrentUser from "../../hooks/useCurrentUser"

const AccountPage = () => {
    const { 
        authUser, isLoggedIn, updateUser, isSuccessfulUpdate, isFailedUpdate, 
        setSuccessfulUpdate, setFailedUpdate } = useAuth()
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [oldPassword, setOldPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [fadeOut, setFadeOut] = useState(false) // State to control fade-out effect

    const navigate = useNavigate()
    const { 
        currentUser, errorStatusCurrentUser,
    } = useCurrentUser()

    const handleUpdate = () => {
        updateUser("http://localhost:8000/api/current-user/", {
            username,
            email,
            oldPassword,
            newPassword
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
        console.log(authUser)
    }, [])

    useEffect(() => {
        if (isSuccessfulUpdate) {
            setFadeOut(false);
            handleUpdateValues(currentUser); // Clear passwords immediately
            setFailedUpdate(false)
            // Start the fade-out effect
            setTimeout(() => {
                setFadeOut(true); // Trigger fade-out
            }, 0);

            // After the fade-out completes, reset the success state
            setTimeout(() => {
                setSuccessfulUpdate(false);
            }, 2000); // Match the duration of the fade-out CSS transition
        } else {
            setSuccessfulUpdate(false)
        }
    }, [isSuccessfulUpdate, currentUser, errorStatusCurrentUser, isFailedUpdate]);
    

    return (
        <div className="account-page">
            <section className="account">
                <h1>Account Management</h1>
                <div className="account-settings-container">
                    <div className="settings">
                        <div>
                            <img src={Sibawaihy} alt="" />
                            <strong>{authUser?.user?.username || "Loading..."}</strong>
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
                                    value={authUser?.user?.email}
                                    disabled
                                />
                            </form>
                            <form action="">
                                <label htmlFor="">Username</label>
                                <input 
                                    type="text" 
                                    value={authUser?.user?.username}
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
                                {isFailedUpdate && 
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
                                {isFailedUpdate && 
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