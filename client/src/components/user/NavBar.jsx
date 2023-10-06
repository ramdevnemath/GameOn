import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { dropCredentials } from "../../redux/slices/userSlice"

function NavBar() {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  
  const handleToggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  }
  
  const handleLogout = () => {
    dispatch(dropCredentials());
    setIsDropdownVisible(!isDropdownVisible)
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <nav className="bg-black p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-semibold">
            GameOn | Pick Your Spot
          </div>
          <div className="hidden md:flex space-x-4 flex-grow items-center justify-center"> {/* Centering items */}
            <Link to={""} className="text-white hover:text-gray-300">Home</Link>
            <Link to={""} className="text-white hover:text-gray-300">About</Link>
            <Link to={""} className="text-white hover:text-gray-300">Services</Link>
          </div>
          <div className="relative group">
          {
            user ? 
            ( <button onClick={handleToggleDropdown} className="text-white hover:text-gray-300 mr-40">{ user.user.fname }</button> ) :
            ( <button onClick={handleLogin} className="text-white hover:text-gray-300 mr-40">LogIn</button> )
          }
            {isDropdownVisible && (
              <div className="absolute mt-2 py-2 w-40 bg-white shadow-xl">
                <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Profile</Link>
                <button onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Sign Out</button>
              </div>
            )}
          </div>
        </div>
      </nav >
      <section className='flex justify-center items-center h-screen'>
        {
          user ? (
            <h1 className='text-4xl' style={{ fontSize: '2rem' }}>Hi {user.user.fname} {user.user.lname} !!</h1>
          ) : (
            <h1 className='text-4xl' style={{ fontSize: '2rem' }}>You are not logged in</h1>
          )
        }
      </section>
    </>
  )
}

export default NavBar