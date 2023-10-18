import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { dropCredentials } from '../../redux/slices/vendorSlice'
import Logo from "../../images/Logo.png"

function NavBar(props) {

    const vendor = useSelector(state => state.vendor)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isSticky, setSticky] = useState(false)

    const handleToggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    }

    const handleLogout = () => {
        dispatch(dropCredentials());
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
            <nav className={`bg-black p-4 ${isSticky ? 'fixed top-0 w-full' : ''}`} style={{ zIndex: '2' }}>
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white text-2xl font-semibold">
                        <img src={Logo} style={{ width: "150px", height: "auto" }} alt='logo'></img>
                    </div>
                    <div className="hidden md:flex space-x-4 flex-grow items-center justify-center">
                        <Link to={"/vendor/dashboard"} className="text-white hover:text-gray-300">Dashboard</Link>
                        <Link to={"/vendor/turf-details"} className="text-white hover:text-gray-300">Add turf</Link>
                        <Link to={""} className="text-white hover:text-gray-300">Bank Details</Link>
                        <Link to={""} className="text-white hover:text-gray-300">Config</Link>
                        <Link to={""} className="text-white hover:text-gray-300">Working</Link>
                        <div className='relative group'>
                            <button onClick={handleToggleDropdown} className="text-white hover:text-gray-300 mr-40">Bookings</button>
                            {isDropdownVisible && (
                                <div className="absolute mt-2 py-2 w-40 bg-white shadow-xl" style={{ zIndex: "2" }}>
                                    <Link className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Upcoming</Link>
                                    <Link className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Completed</Link>
                                    <Link className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Cancelled</Link>
                                    <Link className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Add booking</Link>
                                </div>
                            )}
                        </div>
                    </div>
                    <Link onClick={handleLogout} className="text-white hover:text-gray-300">Logout</Link>
                </div>
            </nav >
        </>
    )
}

export default NavBar