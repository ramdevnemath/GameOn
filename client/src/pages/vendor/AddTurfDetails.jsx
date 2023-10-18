import React, { useState } from 'react'
import { BeatLoader } from 'react-spinners'
import NavBar from '../../components/vendor/Navbar'
import Footer from '../../components/user/Footer'
import noImg from "../../images/banner1.jpg"
import "./AddTurfDetails.css"

function AddTurfDetails() {

    const [loader, setLoader] = useState(false);
    const [tags, setTags] = useState([]);
    const [turfName, setTurfName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [tagInput, setTagInput] = useState('');

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

    const handleFormSubmit = event => {
        event.preventDefault();
        console.log('Form Submitted:', { turfName, tags, description, location });
    };

    return (
        <>
            <NavBar />
            {loader && (
                <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black/90 z-40">
                    <BeatLoader color="#36d7b7" />
                </div>
            )}
            <div className='flex'>
                <div className='form-container'>
                    <form className="form" onSubmit={handleFormSubmit}>
                        <div className="mb-3 flex flex-wrap">
                            <div className="w-full md:w-3/4 md:pr-2 md:mb-0">
                                <label className="block text-sm font-bold text-gray-700" htmlFor="turfName">
                                    Turf Name
                                </label>
                                <input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="turfName"
                                    type="text"
                                    placeholder="Ground Name"
                                    value={turfName}
                                    onChange={e => setTurfName(e.target.value)}
                                />
                            </div>
                            <div className="w-full md:w-1/4 md:pl-2 md:mb-0 flex items-center justify-end">
                                <button
                                    className="btn block text-sm mt-3 font-bold text-white addImage-button"
                                    onClick={() => document.getElementById("id_proof_input").click()}
                                >
                                    Add Images
                                </button>
                                <input
                                    style={{ display: "none" }}
                                    id="id_proof_input"
                                    type="file"
                                    name='idProof'
                                // onChange={""}
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
                        <div className="mb-4">
                            <label className="block text-sm font-bold text-gray-700" htmlFor="location">
                                Location
                            </label>
                            <textarea
                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="location"
                                type="text"
                                placeholder="Turf location"
                                rows={4}
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                            />
                        </div>
                        <div className="text-center">
                            <button
                                className="submit-button"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>


                <div className="section-container">
                    <div id="indicators-carousel" className="relative w-full" data-carousel="static">
                        {/* Carousel wrapper */}
                        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                            {/* Item 1 */}
                            <div className="hidden duration-700 ease-in-out" data-carousel-item="active">
                                <img src={noImg} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="img1" />
                            </div>
                        </div>
                        {/* Slider indicators */}
                        <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                            <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                            <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                            <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                            <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                            <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
                        </div>
                        {/* Slider controls */}
                        <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                </svg>
                                <span className="sr-only">Previous</span>
                            </span>
                        </button>
                        <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <span className="sr-only">Next</span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AddTurfDetails