import React from 'react'
import { useState } from 'react'
import { BeatLoader } from 'react-spinners'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {

    const sectionStyle = {
        backgroundImage: `url("https://downloader.la/temp/[Downloader.la]-651e6a21ea75d.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const [email, setEmail] = useState("")
    const [loader, setLoader] = useState(false)
    const [buttonDisabled, setIsButtonDisabled] = useState(false)
    const { addToast } = useToasts()
    const navigate = useNavigate()

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setLoader(true);
        setIsButtonDisabled(true);
        try {
            const response = await axios.post('http://localhost:7000/api/users/password-reset', { email });
            if (response.status === 200) {
                addToast('Verification link has been sent to your email successfully!', { appearance: 'success' });
            } else {
                addToast('Failed to send verification email.', { appearance: 'error' });
            }
        } catch (error) {
            addToast('Error sending verification email. Please try again later.', { appearance: 'error' });
        } finally {
            setLoader(false);
            setIsButtonDisabled(false);
            navigate('/login')
        }
    };

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
                                <h3 className="fw-bold mb-5">Account verification</h3>
                                <form onSubmit={handlePasswordReset}>
                                    <div className="form-outline mb-4">
                                        <input type="email"
                                            id="form3Example3"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder='Enter your email address'
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="bg-blue-500 rounded hover:bg-blue-700 text-white font-bold py-2 px-4 block w-full mb-4"
                                        disabled={buttonDisabled}
                                    >
                                        Click to get verification email
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

export default ForgotPassword