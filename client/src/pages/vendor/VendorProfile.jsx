import React, { useEffect, useRef, useState } from 'react'
import NavBar from '../../components/vendor/Navbar'
import { useSelector } from 'react-redux';
import Footer from '../../components/user/Footer';
import { vendorInstance } from '../../APIs/api';
import { useToasts } from 'react-toast-notifications';
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from '../../firebase/firebase';
import noImg from "../../images/noimage.jpg"

function VendorProfile() {

    const vendor = useSelector(state => state.vendor)
    const vendorId = vendor.vendor._id
    const fileInputRef = useRef(null);
    const { addToast } = useToasts()

    const [turf, setTurf] = useState()
    const [imgUrl, setImgUrl] = useState(noImg)

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
    
        if (file) {
            const storageRef = ref(storage, `${vendor.vendor.fullName}/profilePic/`);
            try {
                const response = await listAll(storageRef)
                await Promise.all(response.items.map(item => deleteObject(item)));
                const imageRef = ref(storage, `${vendor.vendor.fullName}/profilePic/${file.name}`);
                await uploadBytes(imageRef, file);
                const imageUrl = await getDownloadURL(imageRef);
                setImgUrl(imageUrl);
                addToast("Profile pic updated.", { appearance: "success", autoDismiss: true })
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };
    

    useEffect(() => {
        const fetchImageURLs = async () => {
            try {
                const imageRef = ref(storage, `${vendor.vendor.fullName}/profilePic/`);
                const response = await listAll(imageRef);

                if (response.items.length > 0) {
                    const downloadURL = await getDownloadURL(response.items[0]);
                    setImgUrl(downloadURL);
                    console.log(downloadURL);
                } else {
                    console.log("No images found in the folder.");
                }
            } catch (error) {
                console.error("Error fetching image URL:", error);
            }
        };
        fetchImageURLs();
    }, []);


    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {

        const fetchTurf = async () => {
            try {
                const response = await vendorInstance.get(`/turf-details/${vendorId}`);
                setTurf(response.data);
            } catch (error) {
                console.error('Error fetching turf details:', error);
            }
        };

        fetchTurf();
    }, [vendorId])

    return (
        <>
            <NavBar />
            <main className="profile-page bg-slate-500">
                <section className="relative block h-[500px]">
                    <div className="relative top-0 w-full h-full bg-center bg-cover" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')` }}>
                        <span id="blackOverlay" className="w-full h-full absolute opacity-10 bg-black"></span>
                    </div>
                    <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{ transform: 'translateZ(0px)' }}>
                        <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                            <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                        </svg>
                    </div>
                </section>
                <section className="relative py-16 bg-blueGray-200">
                    <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <div className="px-6">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                        <div className="relative flex justify-center">
                                            <img
                                                className="shadow-xl rounded-full h-64 w-96 border-none -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                                alt="..."
                                                onClick={handleImageClick}
                                                src={imgUrl}
                                            />
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                style={{ display: 'none' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                        <div className="py-6 px-3 mt-32 sm:mt-0">
                                            <button className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                                Connect
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span className="text-sm text-blueGray-400">Friends</span>
                                            </div>
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">Photos</span>
                                            </div>
                                            <div className="lg:mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span className="text-sm text-blueGray-400">Comments</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-12">
                                    <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                                        {vendor.vendor.fullName}
                                    </h3>
                                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                                        <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
                                        {vendor.vendor.email}
                                    </div>
                                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                                        <i className="fas fa-phone-alt mr-2 text-lg text-blueGray-400"></i>
                                        {vendor.vendor.phone}
                                    </div>
                                    <div className="mb-2 text-blueGray-600 mt-10">
                                        <i className="fas fa-th mr-2 text-lg text-blueGray-400"></i>Venue Name - {vendor.vendor.turfName}
                                    </div>
                                    <div className="mb-2 text-blueGray-600">
                                        <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{turf && turf.location}
                                    </div>
                                </div>
                                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-4">
                                            <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                                {turf && turf.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default VendorProfile