import React, { useEffect, useState } from 'react'
import NavBar from '../../components/admin/NavBar'
import Turfimg from '../../images/turf.jpg'
import { Link } from 'react-router-dom';
import { adminInstance } from '../../APIs/api';

function Vendors() {

    const [vendors, setVendors] = useState([])

    useEffect(() => {
        adminInstance.get('/vendors-list')
            .then((res) => {
                setVendors(res.data.vendors)
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            })
    }, []);

    const updatedVendors = vendors.map((vendor) => {
        return {
            ...vendor,
            createdAt: new Date(vendor.createdAt).toLocaleDateString(),
        };
    });

    return (
        <>
            <NavBar />
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-5 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {updatedVendors.map((vendor) => (
                            <div className="p-4 md:w-1/3" key={vendor._id} >
                                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                                    <div className="w-full">
                                        <div className="w-full flex p-2">
                                            <div className="p-2 ">
                                                <img
                                                    src="https://firebasestorage.googleapis.com/v0/b/thecaffeinecode.appspot.com/o/Tcc_img%2Flogo.png?alt=media&token=5e5738c4-8ffd-44f9-b47a-57d07e0b7939" alt="author"
                                                    className="w-10 h-10 rounded-full overflow-hidden" />
                                            </div>
                                            <div className="pl-2 pt-2 ">
                                                <p className="font-bold">{vendor.fullName}</p>
                                                <p className="text-xs">Created on: {vendor.createdAt}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={Turfimg} alt="blog cover" />

                                    <div className="p-4">
                                        <h2 className="tracking-widest text-xs title-font font-bold text-green-400 mb-1 uppercase ">{vendor.email} | {vendor.phone}</h2>
                                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{vendor.turfName}</h1>
                                        <div className="flex items-center flex-wrap ">
                                            <Link to={ `/admin/vendor-details/${vendor._id}`} state={{ vendors }} className="text-green-800  md:mb-2 lg:mb-0">
                                                <p className="inline-flex items-center">View more
                                                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M5 12h14"></path>
                                                        <path d="M12 5l7 7-7 7"></path>
                                                    </svg>
                                                </p>
                                            </Link>
                                            <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                                </svg>
                                                24
                                            </span>
                                            <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                                                <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                                </svg>
                                                89
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Vendors