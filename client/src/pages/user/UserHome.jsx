import React, { useState } from 'react';
import Carousel from '../../components/user/Carousel';
import NavBar from '../../components/user/NavBar';
import Contents from '../../components/user/contents';
import Footer from '../../components/user/Footer';
import Popup from '../../components/user/PopUp';

function UserHome() {

  const [showPopup, setShowPopup] = useState(false)

  const togglePopup =()=> {
    setShowPopup(!showPopup)
  }

  return (
    <div style={{ backgroundColor: "#e5e5f7", backgroundImage: "radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px)", backgroundSize: "10px 10px" }}>
      <NavBar togglePopup={togglePopup} />
      <Carousel />
      <Popup show={showPopup} onClose={togglePopup} />
      <Contents />
      <Footer />
    </div>
  );
}

export default UserHome;
