import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { dropCredentials } from "../../redux/slices/adminSlice"
import Logo from "../../images/Logo.png"

function NavBar() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    dispatch(dropCredentials());
    navigate('/admin/login')
  }

  return (
    <>
      <nav className="bg-black p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-semibold">
            <img src={Logo} alt="logo" style={{width:"150px", height:"auto"}} />
          </div>
          <div className="hidden md:flex space-x-4 flex-grow items-center justify-center">
            <Link to={"/admin/dashboard"} className="text-white hover:text-gray-300">Dashboard</Link>
            <Link to={"/admin/users-list"} className="text-white hover:text-gray-300">Users</Link>
            <Link to={""} className="text-white hover:text-gray-300">Vendors</Link>
            <Link to={""} className="text-white hover:text-gray-300">Bookings</Link>
          </div>
          <div className="relative group"><button onClick={handleLogout} className="text-white hover:text-gray-300 mr-40">LogOut</button>
          </div>
        </div>
      </nav >
    </>
  )
}

export default NavBar