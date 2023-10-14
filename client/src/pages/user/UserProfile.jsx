import React, { useState } from 'react'
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import NavBar from '../../components/user/NavBar';
import { useSelector } from 'react-redux';

function UserProfile() {

    const user = useSelector(state => state.user)

    const sectionStyle = {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const [loader, setLoader] = useState(false)
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
    })

    const updateProfile = async (e)=> {
        e.preventDefault()
        try {
            setLoader(true)
            await axios.post(`http://localhost:7000/api/users/update-profile/${user.user._id}`, formData)
        } catch (error) {
            console.error(error)
        } finally {
            setLoader(false)
        }
    }

    return (
        <>
            <NavBar/>
            <h2 className="text-title-md2 font-bold text-black dark:text-white">
                Profile
            </h2>
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
                                    <form onSubmit={ updateProfile }>
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
                                            Update
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

export default UserProfile