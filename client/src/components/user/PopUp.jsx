import React from 'react';
import VendorRegistration from './VendorRegistration';
import "./Popup.css"

function Popup(props) {

    return (
        props.show && (
            <div className='popup-overlay' style={{zIndex:"2"}}>
                <div className="popup-container">
                    <div className="popup-content">
                        <span className="close" onClick={props.onClose}>
                            &times;
                        </span>
                        <VendorRegistration onClose={props.onClose}/>
                    </div>
                </div>
            </div>
        )
    );
}

export default Popup;
