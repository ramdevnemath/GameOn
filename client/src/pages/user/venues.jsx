import React, { useEffect, useState } from 'react'
import NavBar from '../../components/user/NavBar'
import Footer from '../../components/user/Footer';
import { userInstance } from '../../APIs/api';
import Popup from '../../components/user/PopUp';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useSelector } from 'react-redux';

function Venues() {

    const navigate = useNavigate()
    const { addToast } = useToasts()
    const user = useSelector(state => state.user)

    const [turfs, setTurfs] = useState([]);
    const [selectedOption, setSelectedOption] = useState('All')
    const [dropdown, setDropdown] = useState(false)
    const [showPopup, setShowPopup] = useState(false)

    const togglePopup = () => {
        setShowPopup(!showPopup)
    }

    const handleOptionChange = (option) => {
        setSelectedOption(option)
        setDropdown(false)
    }

    const viewTurf = async (turfId) => {
        try {
            if (user) {
                const response = await userInstance.get(`/venues/${turfId}`)
                if (response.status === 200) {
                    const data = response.data
                    navigate('/venues/view-turf', { state: { data: data } })
                }
            } else {
                addToast("Login to view turf")
                navigate('/user/login')
            }
        } catch (error) {
            console.error('Error fetching turf details:', error);
        }
    }

    useEffect(() => {

        const fetchTurfs = async () => {
            try {
                const response = await userInstance.get('/turf-details');
                setTurfs(response.data);
            } catch (error) {
                console.error('Error fetching turf details:', error);
            }
        };

        fetchTurfs();
    }, [])

    return (
        <div className='bg-slate-500 mt-[75px]'>
            <NavBar togglePopup={togglePopup} />
            <Popup show={showPopup} onClose={togglePopup} />
            <div className='flex justify-center text-4xl p-3 font-extrabold '>
                <p>VENUES' LIST</p>
            </div>
            <div className="flex justify-center text-left mb-5 mt-3 ml-3">
                <div>
                    <button
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                        id="options-menu"
                        aria-haspopup="true"
                        aria-expanded={dropdown}
                        onClick={() => setDropdown(!dropdown)}
                    >
                        Sort by City: {selectedOption}
                        <svg
                            className="-mr-1 ml-2 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    {dropdown && (
                        <div
                            className="origin-top-right absolute mt-2 mx-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                        >
                            <div className="py-1" role="none">
                                <button
                                    onClick={() => handleOptionChange('All')}
                                    className={`block w-full justify-start px-4 py-2 text-sm ${selectedOption === 'All' ? 'font-bold' : ''} text-gray-700 hover:bg-gray-100 hover:text-gray-900`}
                                    role="menuitem"
                                >
                                    All
                                </button>
                                {turfs.map((turf) => (
                                    <button
                                        key={turf.city}
                                        onClick={() => handleOptionChange(turf.city)}
                                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        role="menuitem"
                                    >
                                        {turf.city}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {turfs &&
                turfs.map((turf) => (
                    (selectedOption === turf.city || selectedOption === 'All') && (
                        <div className='container flex justify-center mx-auto' key={turf.id}>
                            <div className="mx-auto w-2/3 flex items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <img className="object-cover w-1/5 rounded-t-lg md:h-auto md:rounded-none md:rounded-l-lg" src={turf.imageUrls[0]} alt="" />
                                <div className="flex flex-col justify-between p-4">
                                    <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">{turf.turfName}</h5>
                                </div>
                                <div className='flex justify-between items-center p-4 w-full'>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">{turf.description}</p>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-600">{turf.location}</h5>
                                    <button
                                        className="px-4 py-2 text-white bg-indigo-500 rounded hover:bg-indigo-600 focus:outline-none"
                                        onClick={() => viewTurf(turf._id)}
                                    >View</button>
                                </div>
                            </div>
                        </div>
                    )
                ))}
            <div className='mb-5'></div>
            <Footer />
        </div>
    )
}

export default Venues