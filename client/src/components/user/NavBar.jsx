import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { dropCredentials } from "../../redux/slices/userSlice"
import Logo from "../../images/Logo.png"

function NavBar(props) {
  
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isSticky, setSticky] = useState(false)
  
  const handleToggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  }
  
  const handleLogout = () => {
    dispatch(dropCredentials());
    setIsDropdownVisible(!isDropdownVisible)
  };

  const handleLogin = () => {
    navigate('/user/login');
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav className={`bg-black p-4 ${isSticky ? 'fixed top-0 w-full' : ''}`} style={{ zIndex:'1'}}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-semibold">
            <img src={Logo} style={{width:"150px", height:"auto"}} alt='logo'></img>
          </div>
          <div className="hidden md:flex space-x-4 flex-grow items-center justify-center">
            <Link to={"/home"} className="text-white hover:text-gray-300">Home</Link>
            <Link onClick={props.togglePopup} className="text-white hover:text-gray-300">JoinUs</Link>
            <Link to={"/venues"} className="text-white hover:text-gray-300">Venues</Link>
          </div>
          <div className="relative group">
          {
            user ? 
            ( <button onClick={handleToggleDropdown} className="text-white hover:text-gray-300 mr-40">{ user.user.fname }</button> ) :
            ( <button onClick={handleLogin} className="text-white hover:text-gray-300 mr-40">LogIn</button> )
          }
            {isDropdownVisible && (
              <div className="absolute mt-2 py-2 w-40 bg-white shadow-xl">
                <Link to={`/user/profile`} className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Profile</Link>
                <Link onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Sign Out</Link>
              </div>
            )}
          </div>
        </div>
      </nav >
    </>
  )
}

export default NavBar