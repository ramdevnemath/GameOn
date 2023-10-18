import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import ViewDocs from '../../components/admin/ViewDocs';
import NavBar from '../../components/admin/NavBar';
import { adminInstance } from '../../APIs/api';

function VendorDetails(props) {

    const { id } = useParams()

    const [popupVisible, setPopupVisible] = useState(false);
    const [vendor, setVendor] = useState({})
    const [loader, setLoader] = useState(false)

    const togglePopup = () => {
        setPopupVisible(!popupVisible);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await adminInstance.get(`/get-vendor/${id}`);
                setVendor(response.data);
            } catch (error) {
                console.error("Error fetching vendor data", error);
            }
        };
        fetchData();
    }, [id]);

    const vendorControl = async (id, e) => {
        e.preventDefault()
        try {
            setLoader(true)
            const response = await adminInstance.put("/vendor-control", { id })
            setVendor(vendor => {
                    if (vendor._id === response.data._id) {
                        return response.data
                    }
                    return vendor
                })
        } catch (error) {
            console.error("Error toggling user status", error)
        } finally {
            setLoader(false)
        }
    }

    return (
        <>
            <NavBar />
            <div className="w-full max-w-full">
                {loader && (
                    <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black/80 z-50">
                        <BeatLoader color="#36d7b7" />
                    </div>
                )}
                <div className="mx-auto bg-white rounded-lg shadow-lg p-6">
                    <div className="table-responsive">
                        <table className="table-auto w-full text-slate-500">
                            <thead className="thead-light">
                                <tr>
                                    <th className="py-2 px-4">Full Name</th>
                                    <th className="py-2 px-4">Last Name</th>
                                    <th className="py-2 px-4">Email</th>
                                    <th className="py-2 px-4">Phone</th>
                                    <th className='py-2 px-4'>Documents</th>
                                    <th className="py-2 px-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={id}>
                                    <td className="py-2 px-4 font-normal text-sm">{vendor.fullName}</td>
                                    <td className="py-2 px-4 font-normal text-sm">{vendor.turfName}</td>
                                    <td className="py-2 px-4 font-normal text-sm">{vendor.email}</td>
                                    <td className="py-2 px-4 font-normal text-sm">{vendor.phone}</td>
                                    <td className='py-2 px-4 font-normal text-sm'>
                                        <button onClick={togglePopup}>View</button>
                                        <ViewDocs show={popupVisible} onClose={togglePopup} vendor={vendor} />
                                    </td>
                                    <td className="py-2 px-4 font-normal text-sm">
                                        <button
                                            onClick={(e) => vendorControl(id, e)}
                                            className={
                                                vendor.isActive
                                                    ? "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                    : "bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                                            }
                                        >
                                            {vendor.isActive ? "Block" : "Approve"}
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <section>
                <p className='flex align-center justify-center mt-3 font-bold underline'>TURF DETAILS</p>
            </section>
        </>
    )
}

export default VendorDetails