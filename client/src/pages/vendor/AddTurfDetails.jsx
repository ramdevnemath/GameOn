import React, { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase/firebase'
import { vendorInstance } from '../../APIs/api'
import NavBar from '../../components/vendor/Navbar'
import Footer from '../../components/user/Footer'
import "./AddTurfDetails.css"

function AddTurfDetails() {

    const vendor = useSelector(state => state.vendor)
    const vendorId = vendor.vendor._id
    const { addToast } = useToasts()
    const navigate = useNavigate()

    const [loader, setLoader] = useState(false);
    const [tags, setTags] = useState([]);
    const [turfName, setTurfName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [city, setCity] = useState('');
    const [imageList, setImageList] = useState([])
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageUpload, setImageUpload] = useState([])
    const [formMode, setFormMode] = useState('Add')
    const [addedTurfDetails, setAddedTurfDetails] = useState(null)

    const imageListRef = ref(storage, `${vendor.vendor.fullName}/`);

    const handleTagInputChange = event => {
        setTagInput(event.target.value);
    };

    const removeTag = index => {
        const updatedTags = [...tags];
        updatedTags.splice(index, 1);
        setTags(updatedTags);
    };

    const handleTagInputKeyPress = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTag();
        }
    };

    const addTag = () => {
        if (tagInput && !tags.includes(tagInput)) {
            setTags([...tags, tagInput]);
            setTagInput('');
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoader(true);
            if (formMode === 'Add') {
                if (imageUpload && imageUpload.length > 0) {
                    if (imageUpload.length === 1) {
                        const file = imageUpload[0];
                        const imageRef = ref(storage, `${vendor.vendor.fullName}/${file.name + vendor.vendor._id}`);
                        await uploadBytes(imageRef, file);
                        const imageUrl = await getDownloadURL(imageRef);
                        const response = await vendorInstance.post('/post-turf-details', {
                            vendor,
                            tags,
                            turfName,
                            description,
                            location,
                            city,
                            imageUrls: [imageUrl]
                        });
                        if (response.status === 200) {
                            setAddedTurfDetails(response.data)
                        }
                        addToast('Turf added successfully!', { appearance: 'success', autoDismiss: true });
                        navigate('/vendor/turf-details')
                    } else {
                        const uploadPromises = imageUpload.map((file) => {
                            const imageRef = ref(storage, `${vendor.vendor.fullName}/${file.name + vendor.vendor._id}`);
                            return uploadBytes(imageRef, file);
                        });
                        await Promise.all(uploadPromises);
                        const imageUrls = await Promise.all(
                            imageUpload.map(async (file) => {
                                const imageRef = ref(storage, `${vendor.vendor.fullName}/${file.name + vendor.vendor._id}`);
                                return await getDownloadURL(imageRef);
                            })
                        );

                        const response = await vendorInstance.post('/post-turf-details', {
                            vendor,
                            tags,
                            turfName,
                            description,
                            location,
                            city,
                            imageUrls
                        });
                        if (response.status === 200) {
                            setAddedTurfDetails(response.data)
                        }
                        addToast('Turf added successfully!', { appearance: 'success', autoDismiss: true });
                        navigate('/vendor/turf-details')
                    }
                } else {
                    addToast('No images selected!', { appearance: 'warning', autoDismiss: true });
                    navigate('/vendor/turf-details')
                }
            } else if (formMode === 'Update') {
                if (imageUpload.length === 1) {
                    const file = imageUpload[0];
                    const imageRef = ref(storage, `${vendor.vendor.fullName}/${file.name + vendor.vendor._id}`);
                    await uploadBytes(imageRef, file);
                    const imageUrl = await getDownloadURL(imageRef);
                    const response = await vendorInstance.post('/update-turf-details', {
                        vendor,
                        tags,
                        turfName,
                        description,
                        location,
                        city,
                        imageUrls: [imageUrl]
                    });
                    setAddedTurfDetails(response.data)
                }
                const uploadPromises = imageUpload?.map((file) => {
                    const imageRef = ref(storage, `${vendor.vendor.fullName}/${file.name + vendor.vendor._id}`);
                    return uploadBytes(imageRef, file);
                });
                await Promise.all(uploadPromises);
                const imageUrls = await Promise.all(
                    imageUpload?.map(async (file) => {
                        const imageRef = ref(storage, `${vendor.vendor.fullName}/${file.name + vendor.vendor._id}`);
                        return await getDownloadURL(imageRef);
                    })
                );

                await vendorInstance.post('/update-turf-details', {
                    vendor,
                    tags,
                    turfName,
                    description,
                    location,
                    city,
                    imageUrls
                });

                addToast('Turf updated successfully!', { appearance: 'success', autoDismiss: true });
                navigate('/vendor/turf-details')
            }
        } catch (error) {
            console.error('Error uploading images or submitting form:', error);
            addToast('Error uploading images or submitting form. Please try again.', {
                appearance: 'error',
                autoDismiss: true,
            });
            navigate('/vendor/turf-details')
        } finally {
            setLoader(false)
            console.log(formMode)
        }
    }

    const handleFileInputChange = (event) => {
        const files = event.target.files;
        setImageUpload(Object.values(files));
    };

    useEffect(() => {
        const fetchImageURLs = async () => {
            try {
                const response = await listAll(imageListRef);
                const downloadURLPromises = response.items.map((item) => getDownloadURL(item));
                const imageURLs = await Promise.all(downloadURLPromises);
                setImageList(imageURLs);
            } catch (error) {
                console.error("Error fetching image URLs:", error);
            }
        };

        fetchImageURLs();
    }, [imageList]);

    useEffect(() => {
        const isTurfExists = async () => {
            try {
                const response = await vendorInstance.get(`/turf-details/${vendorId}`)
                if(response.status === 200) {
                    setFormMode("Update")
                }
                if (formMode === 'Update') {
                    setTurfName(response.data.turfName);
                    setDescription(response.data.description);
                    setTags(response.data.tags)
                    setLocation(response.data.location);
                    setCity(response.data.city);
                }   
            } catch (error) {
                console.error("Error finding turf already added or not", error);
            }
        }
        isTurfExists()
    }, [formMode]);


    return (
        <>
            <NavBar />
            {loader && (
                <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black/80 z-50">
                    <BeatLoader color="#36d7b7" />
                </div>
            )}
            <div className='flex bg-slate-500'>
                <div className='form-container mt-[70px]'>
                    <form className="form" onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                            <label className="block text-sm font-bold text-gray-700" htmlFor="turfName">
                                Turf Name
                            </label>
                            <div className="w-full md:w-4/4 md:pr-2 md:mb-0">
                                <input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="turfName"
                                    type="text"
                                    placeholder="Ground name"
                                    value={turfName}
                                    onChange={e => setTurfName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='mb-3 flex flex-wrap'>
                            <div className="w-full md:w-1/4 md:mb-0 items-center justify-end">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="turfImages">Add images</label>
                                <input
                                    className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    id="turfImages"
                                    type="file"
                                    name='turfImages'
                                    multiple
                                    onChange={handleFileInputChange}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-bold text-gray-700">Amenities</label>
                            <div className="w-full md:w-4/4 md:pr-2 md:mb-0">
                                <ul id="tags">
                                    {tags.map((tag, index) => (
                                        <li key={index} className="tag">
                                            {tag}
                                            <span className="tag-close-icon" onClick={() => removeTag(index)}>
                                                X
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <input
                                    className='w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                                    type="text"
                                    placeholder="Press enter to add tags"
                                    value={tagInput}
                                    onChange={handleTagInputChange}
                                    onKeyPress={handleTagInputKeyPress}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-bold text-gray-700" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="description"
                                type="text"
                                placeholder="About your turf"
                                value={description}
                                rows={4}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-bold text-gray-700" htmlFor="location">
                                Location
                            </label>
                            <textarea
                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="location"
                                type="text"
                                placeholder="Turf location"
                                rows={4}
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold text-gray-700" htmlFor="turfName">
                                City
                            </label>
                            <div className="w-full md:w-4/4 md:pr-2 md:mb-0">
                                <input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="turfName"
                                    type="text"
                                    placeholder="Ground Name"
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            {formMode === 'Add' ? (
                                <button
                                    className="submit-button"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            ) : (
                                <button
                                    className="submit-button"
                                    type="submit"
                                >
                                    Update
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="section-container flex items-center">
                    <div id="indicators-carousel" className="relative w-full" data-carousel="static">
                        <div className="relative h-96 overflow-hidden rounded-lg md:h-96">
                            {imageList.map((url, index) => (
                                <div
                                    key={index}
                                    className={`duration-700 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                                    data-carousel-item={index === currentImageIndex ? 'active' : ''}
                                >
                                    <img
                                        src={url}
                                        className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                        alt={`img${index}`}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="absolute z-30 space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                            {imageList.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-gray-300'}`}
                                    aria-current={index === currentImageIndex}
                                    aria-label={`Slide ${index + 1}`}
                                    onClick={() => setCurrentImageIndex(index)}
                                ></button>
                            ))}
                        </div>
                        <button
                            type="button"
                            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                            data-carousel-prev
                            onClick={() => setCurrentImageIndex((prev) => (prev - 1 + imageList.length) % imageList.length)}
                        >
                            <span className="sr-only">Previous</span>
                        </button>
                        <button
                            type="button"
                            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                            data-carousel-next
                            onClick={() => setCurrentImageIndex((prev) => (prev + 1) % imageList.length)}
                        >
                            <span className="sr-only">Next</span>
                        </button>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}

export default AddTurfDetails