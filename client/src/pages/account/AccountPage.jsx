import "./style.css"
import Sibawaihy from "../../assets/sibawaihy.jpg"
import Button from "../../components/button/Button"
import { useEffect, useState } from "react"
import useAuth from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
import { useBaseUrl } from "../../contexts/BaseUrlContext"

const AccountPage = () => {
    const { 
        authUser, isLoggedIn, updateUser, isSuccessfulUpdate, isFailedUpdate, 
        setSuccessfulUpdate, setFailedUpdate, isLoading } = useAuth()
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [oldPassword, setOldPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [fadeOut, setFadeOut] = useState(false) // State to control fade-out effect
    const [errMsgs, setErrMsgs] = useState({})
    const navigate = useNavigate()
    const [favScholars, setFavScholars] = useState(0)
    const [favBooks, setFavBooks] = useState(0)
    const BASE_URL = useBaseUrl()
    console.log('Backend URL:', BASE_URL);
    
    const { 
        data: userProfileData,
        request: requestUserProfile
    } = useFetch(BASE_URL+"/api/user-profile/", {
        headers: {
            'Content-Type': 'application/json',
        },
    })

    useEffect(() => {
        requestUserProfile({ token: localStorage.getItem("accessToken") })
    }, [])

    useEffect(() => {
        if (userProfileData) {
            console.log(userProfileData)
            setFavScholars(userProfileData.favourite_scholars?.length)
            setFavBooks(userProfileData.favourite_books?.length)
        }
    }, [userProfileData])

    const handleUpdate = async () => {
        try {
            await updateUser(BASE_URL+"/api/current-user/", {
                username,
                email,
                oldPassword,
                newPassword
            })
            setFadeOut(false);
            setOldPassword("");
            setNewPassword("");
            setFailedUpdate(false)
            // Start the fade-out effect
            setTimeout(() => {
                setFadeOut(true); // Trigger fade-out
            }, 0);

            // After the fade-out completes, reset the success state
            setTimeout(() => {
                setSuccessfulUpdate(false);
            }, 2000); // Match the duration of the fade-out CSS transition
        } catch (err) {
            console.error("Error in accounts page", err)
            console.log(isFailedUpdate)
            setSuccessfulUpdate(false)
            setErrMsgs(err)
        }
    }

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        }
        console.log(authUser)
    }, [])

    return (
        <div className="account-page">
            <section className="account">
                <h1>Account Management</h1>
                <div className="account-settings-container">
                    <div className="settings">
                        <div>
                            <img src={Sibawaihy} alt="" />
                            <strong>{isLoading ? "Loading..." : authUser?.user?.username}</strong>
                            <em>Student of the Arabic Language</em>
                        </div>
                        <ul>
                            <li>
                                <p>Favourite scholars</p>
                                <p>{favScholars}</p>
                            </li>
                            <li>
                                <p>Favourite books</p>
                                <p>{favBooks}</p>
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
                                    <p>{errMsgs?.old_password}</p>
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
                                    <p>{errMsgs?.new_password}</p>
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
                            }}
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AccountPage;