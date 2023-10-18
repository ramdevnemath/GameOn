import React, { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';

function VendorRegistration({onClose}) {

    const [formData, setFormData] = useState({
        fullName: "",
        turfName: "",
        email: "",
        phone: "",
        password: "",
    })

    const [loader, setLoader] = useState(false)
    const { addToast } = useToasts()

    const [fileData, setFileData] = useState({
        idProof: null,
        groundProof: null,
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFileData((prevData) => ({
            ...prevData,
            [name]: files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('fullName', formData.fullName);
        formDataToSend.append('turfName', formData.turfName);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('idProof', fileData.idProof);
        formDataToSend.append('groundProof', fileData.groundProof);

        try {
            setLoader(true)
            const response = await axios.post("http://localhost:7000/api/vendors/register", formDataToSend)
            console.log(response,"RESPONSE")
            if (response.status === 200) {
                addToast('Form data is submitted. Wait for the response from ADMIN', { appearance: 'success', autoDismiss: true });
                onClose()
            }
        } catch (error) {
            if (error?.response?.status === 400) {
                const errorData = error.response.data.errors;
                let errorMsg = errorData.map(e => e?.msg || e)
                errorMsg.forEach(e => addToast(e,{ appearance: "error", autoDismiss: true }))
            } else {
                console.error(error?.response?.data?.error)
                addToast('An error occurred while registering. Please try again later.', { appearance: 'error', autoDismiss: true });
            }
        } finally {
            setLoader(false)
        }
    };

    return (

        <>
            
            {loader && (
                <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black/90 z-40">
                    <BeatLoader color="#36d7b7" />
                </div>
            )}
            <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4 flex flex-wrap">
                    <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="firstName">
                            Full Name
                        </label>
                        <input
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="fullName"
                            type="text"
                            placeholder="Full Name"
                            name='fullName'
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="w-full md:w-1/2 md:pl-2">
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="lastName">
                            Turf Name
                        </label>
                        <input
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="turfName"
                            type="text"
                            placeholder="Turf Name"
                            name='turfName'
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        name='email'
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4 flex flex-wrap">
                    <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="firstName">
                            Phone
                        </label>
                        <input
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="phone"
                            type="tel"
                            placeholder="Phone number"
                            name='phone'
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="w-full md:w-1/2 md:pl-2">
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="lastName">
                            Password
                        </label>
                        <input
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                            name='password'
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="mb-4 flex flex-wrap">
                    <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                            Proof
                        </label>
                        <input
                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="id_proof"
                            type="file"
                            placeholder="Choose ID proof"
                            name='idProof'
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="w-full md:w-1/2 md:pl-2">
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="c_password">
                            Ground License / Taxation
                        </label>
                        <input
                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="ground_proof"
                            type="file"
                            placeholder="Upload ground proof"
                            name='groundProof'
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                <div className="text-center">
                    <button
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit form
                    </button>
                </div>
            </form>
        </>
    )
}

export default VendorRegistration;
