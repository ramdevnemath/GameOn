import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setCredentials } from '../../redux/slices/userSlice';
import { BeatLoader } from 'react-spinners';
import { useToasts } from 'react-toast-notifications';
import { useDispatch } from 'react-redux';
import GoogleLogin from '../../components/user/GoogleLogin';
import axios from 'axios';

function UserLogin() {

    const { addToast } = useToasts()
    const navigate = useNavigate()

    const sectionStyle = {
        backgroundImage: `url(${require('../../images/Background.jpg')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const [loader, setLoader] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const dispatch = useDispatch()

    const loginUser = async (e) => {
        e.preventDefault()
        try {
            setLoader(true)
            const response = await axios.post("http://localhost:7000/api/users/auth/login", formData)
            if (response.status === 200) {
                dispatch(setCredentials({ user: response.data.user, token: response.data.token }))
                addToast('User logged in successfully!', { appearance: 'success', autoDismiss: true })
                navigate('/home')
            }
        } catch (error) {
            if (error?.response?.status === 400) {
                const errorData = error.response.data.errors;
                let errorMsg = errorData.map(e => e?.msg || e)
                errorMsg.forEach(e => addToast(e, { appearance: "error", autoDismiss: true }))
            } else if (error?.response?.status === 401) {
                addToast("Invalid email or password", { appearance: "error", autoDismiss: true })
            } else {
                console.error(error?.response?.data?.error)
                addToast('An error occurred while registering. Please try again later.', { appearance: 'error', autoDismiss: true });
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
                                    <h2 className="fw-bold mb-5">Log in now</h2>
                                    <form onSubmit={loginUser}>

                                        <div className="form-outline mb-4">
                                            <input type="email"
                                                id="form3Example3"
                                                className="form-control"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder='Enter your email address'
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
                                        <Link to={"/user/forgot-password"}>
                                            <button className='text-blue-800 hover:text-blue-900 ml-1'>
                                                Forgot password?
                                            </button>
                                        </Link>
                                        <div className="text-center mt-3">
                                            <button><GoogleLogin setLoader={setLoader} /></button>
                                        </div>
                                        <div className="flex justify-center mt-5">
                                            <p>Don't have an account?</p>
                                            <Link to={'/user/signup'}>
                                                <button className='text-blue-500 hover:text-blue-700 ml-1'>
                                                    SignUp
                                                </button>
                                            </Link>
                                        </div>
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