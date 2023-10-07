import React, { useState } from 'react'
import { BeatLoader } from 'react-spinners'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'

function ResetPassword() {

    const { id, token } = useParams()
    const navigate = useNavigate()
    const { addToast } = useToasts()

    const sectionStyle = {
        backgroundImage: `url("https://downloader.la/temp/[Downloader.la]-651e6a21ea75d.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const [password, setPassword] = useState("")
    const [loader, setLoader] = useState(false)

    const handlePasswordReset = async (e) => {
        e.preventDefault()
        try {
            setLoader(true)
            const response = await axios.post(`http://localhost:7000/api/users/post-password-reset`, { password, id, token })
            if (response.status === 200) {
                addToast('Password changed successfully!', { appearance: 'success' })
                navigate('/login')
            }
            if (response.status === 401) {
                addToast('Token has expired!', { appearance: 'error' })
                navigate('/forgot-password')
            }
        } catch (error) {
            // console.error(error?.response?.data?.error)
            addToast('An error occurred while registering. Please try again later.', { appearance: 'error' });
        } finally {
            setLoader(false)
        }
    }

    return (
        <section className="text-center text-lg-start" style={sectionStyle}>
            {loader && (
                <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black/80 z-40">
                    <BeatLoader color="#36d7b7" />
                </div>
            )}
            <div className="py-4">
                <div className="row g-0 align-items-center">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <div className="card cascading-right" style={{ background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(4px)', width: '500px' }}>
                            <div className="card-body p-5 shadow-5 text-center">
                                <h3 className="fw-bold mb-5">Reset Password</h3>
                                <form onSubmit={handlePasswordReset}>
                                    <div className="form-outline mb-4">
                                        <input type="password"
                                            id="form3Example3"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder='Enter a new password'
                                        />
                                    </div>
                                    <button type="submit" className="bg-blue-500 rounded hover:bg-blue-700 text-white font-bold py-2 px-4 block w-full mb-4">
                                        Update
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ResetPassword