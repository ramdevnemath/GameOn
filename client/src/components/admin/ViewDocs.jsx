import React from 'react'
import './viewDocs.css'

function ViewDocs(props) {

    const { show, onClose, vendor } = props;
    if (!vendor) {
        return null;
    }

    console.log(vendor.idProof)

    return (
        <>
            {show && (
                <div className='popup-overlay' >
                    <div className="popup-container">
                        <div className="popup-content">
                            <span className="close" onClick={onClose}>
                                &times;
                            </span>
                            <div className='flex justify-center items-center'>
                                <img src={`data:image/jpeg;base64,${vendor.idProof}`} alt='ID Proof' style={{ width: "30%", height: "auto" }} />
                                <img src={`data:image/jpeg;base64,${vendor.groundProof}`} alt='Ground Proof' style={{ width: "30%", height: "auto" }} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ViewDocs