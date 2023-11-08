import React, { useState } from 'react'
import "./Popup.css"

function OtpVerification({ onOTPSubmit }) {

    const [otp, setOtp] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        onOTPSubmit(otp);
    };

    return (
        <div className='popup-overlay'>
            <div className="popup-container">
                <div className="popup-content">
                    <div className="text-center">
                        <h3 className="fw-bold mb-5">Enter OTP here</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-outline mb-4">
                                <input
                                    type="tel"
                                    id="form3Example3"
                                    className="form-control"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder='Enter the OTP here'
                                />
                            </div>
                            <button type="submit" className="bg-blue-500 rounded hover:bg-blue-700 text-white font-bold py-2 px-4 block w-full mb-4">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OtpVerification