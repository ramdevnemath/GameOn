import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BeatLoader } from "react-spinners"
import { useNavigate } from 'react-router-dom';
import { useToasts } from "react-toast-notifications";
import axios from 'axios';

function UserSignUp() {

    const navigate = useNavigate()
    const { addToast } = useToasts()

    const sectionStyle = {
        backgroundImage: `url(${require('../../images/signupBackground.jpg')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        password: ''
    })

    const [loader, setLoader] = useState(false)

    const registerUser = async (e) => {
        e.preventDefault()
        try {
            setLoader(true)
            const response = await axios.post("http://localhost:7000/api/users/register", formData)
            if (response.status === 200) {
                addToast('User registered successfully!', { appearance: 'success', autoDismiss: true });
                navigate('/user/login')
            }
        } catch (error) {
            if (error?.response?.status === 400) {
                const errorData = error.response.data.errors;
                let errorMsg = errorData.map(e => e?.msg || e)
                errorMsg.forEach(e => addToast(e,{ appearance: "error", autoDismiss: true }))
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
            <section className="text-center text-lg-start relative" style={sectionStyle}>
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
                                    <h2 className="fw-bold mb-5">Sign Up now</h2>
                                    <form onSubmit={registerUser}>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input
                                                        type="text"
                                                        name="fname"
                                                        id="form3Example1"
                                                        className="form-control"
                                                        value={formData.fname}
                                                        onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
                                                    />
                                                    <label className="form-label" htmlFor="form3Example1">First name</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input
                                                        type="text"
                                                        name="lname"
                                                        id="form3Example2"
                                                        className="form-control"
                                                        value={formData.lname}
                                                        onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
                                                    />
                                                    <label className="form-label" htmlFor="form3Example2">Last name</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input
                                                type="tel"
                                                name='phone'
                                                id="form3Example3"
                                                className="form-control"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                            <label className="form-label" htmlFor="form3Example3">Phone number</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input
                                                type="email"
                                                name='email'
                                                id="form3Example5"
                                                className="form-control"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                            <label className="form-label" htmlFor="form3Example5">Email address</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input
                                                type="password"
                                                name='password'
                                                id="form3Example4"
                                                className="form-control"
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            />
                                            <label className="form-label" htmlFor="form3Example4">Password</label>
                                        </div>

                                        <button type="submit" className="bg-green-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 r">
                                            Sign up
                                        </button>

                                        <div className="flex justify-center mt-5">
                                            <p>Already have an account?</p>
                                            <Link to={'/user/login'}>
                                                <button type='submit' className='text-blue-500 hover:text-blue-700 ml-1'>
                                                    Login
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

export default UserSignUp