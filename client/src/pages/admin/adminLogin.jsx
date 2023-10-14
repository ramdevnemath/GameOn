import React, { useState } from 'react';
import { setCredentials } from '../../redux/slices/adminSlice';
import { BeatLoader } from 'react-spinners';
import { useToasts } from 'react-toast-notifications';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function UserLogin() {

    const { addToast } = useToasts()
    const navigate = useNavigate()

    const sectionStyle = {
        backgroundImage: `url("https://downloader.la/temp/[Downloader.la]-652162442b70a.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const [loader, setLoader] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const dispatch = useDispatch()

    const loginAdmin = async (e) => {
        e.preventDefault()
        try {
            setLoader(true)
            const response = await axios.post("http://localhost:7000/api/admin/auth/login", formData)
            if (response.status === 200) {
                dispatch(setCredentials({ admin: response.data.admin, token: response.data.token }))
                addToast('Admin login successful !', { appearance: 'success', autoDismiss: true })
                navigate('/admin/dashboard')
            }
        } catch (error) {
            if (error?.response?.status === 400) {
                const errorData = error.response.data.errors;
                let errorMsg = errorData.map(e => e?.msg || e)
                errorMsg.forEach(e => addToast(e, { appearance: "error", autoDismiss: true }))
            } else if (error?.response?.status === 401) {
                addToast("Invalid username or password", { appearance: "error", autoDismiss: true })
            } else {
                console.error(error?.response?.data?.error)
                addToast('Something went wrong', { appearance: 'error', autoDismiss: true });
            }
        } finally {  
            setLoader(false)
        }
    }

    return (
        <>
            <section className="text-center text-lg-start" style={sectionStyle}>
                {loader && (
                    <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black/90 z-40">
                        <BeatLoader color="#36d7b7" />
                    </div>
                )}
                <div className="py-4">
                    <div className="row g-0 align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <div className="card cascading-right" style={{ background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(4px)', width: '500px' }}>
                                <div className="card-body p-5 shadow-5 text-center">
                                    <h2 className="fw-bold mb-5">LogIn | Admin Panel</h2>
                                    <form onSubmit={loginAdmin}>
                                        <div className="form-outline mb-4">
                                            <input type="text"
                                                id="form3Example3"
                                                className="form-control"
                                                value={formData.username}
                                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                                placeholder='Enter admin username'
                                            />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input
                                                type="password"
                                                id="form3Example4"
                                                className="form-control"
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                placeholder='Enter your password'
                                            />
                                        </div>

                                        <button type="submit" className="bg-blue-500 rounded hover:bg-blue-700 text-white font-bold py-2 px-4 block w-full mb-4">
                                            Login
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default UserLogin