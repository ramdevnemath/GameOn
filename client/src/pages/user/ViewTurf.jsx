import React, { useEffect, useState } from 'react'
import NavBar from '../../components/user/NavBar'
import Popup from '../../components/user/PopUp'
import { useLocation } from 'react-router-dom'
import StarRating from '../../components/user/StarRating'
import { userInstance } from '../../APIs/api'
import { useSelector } from 'react-redux'
import { useToasts } from 'react-toast-notifications'

function ViewTurf() {

    const user = useSelector(state => state.user)
    const userId = user.user._id
    const location = useLocation()
    const turf = location.state.data
    const turfId = turf._id
    const { addToast } = useToasts()

    const [showPopup, setShowPopup] = useState(false)
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const [reviewText, setReviewText] = useState('')
    const [rating, setRating] = useState(0)
    const [avgRating, setAvgRating] = useState(0)
    const [reviewCount, setReviewCount] = useState(0)
    const [allReview, setAllReview] = useState([])

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleReviewSubmit = async () => {

        const response = await userInstance.post('/venue/review-rating', { rating, reviewText, turfId, userId })

        if (response.status === 200) {
            addToast('Review submitted succesfully!', { appearance: "success", autoDismiss: true })
        } else if (response.status === 201) {
            addToast('Review updated succesfully!', { appearance: "success", autoDismiss: true })
        }
    }

    const togglePopup = () => {
        setShowPopup(!showPopup)
    }

    const isReviewExists = async () => {
        const response = await userInstance.post('/is-review-exists', { userId, turfId })
        console.log(response.data.totalRating)
        if (response.status === 200) {
            setAllReview(response.data.totalRating)
            setReviewCount(response.data.reviewCount)
            setRating(response.data.isReviewExists.rating)
            setReviewText(response.data.isReviewExists.review)
        }
    }

    const filledStars = () => {
        let total = 0;
    
        allReview.forEach((review) => {
            total += review.rating;
        });
    
        const numberOfFilledStars = Math.floor(total / reviewCount);
        setAvgRating(numberOfFilledStars)
    
        return numberOfFilledStars
    };

    
    useEffect(() => {  
        
        const starContainer = document.querySelector('.flex.items-center.mb-4');
        if (starContainer) {
            starContainer.childNodes.forEach((star, index) => {
                if (index < filledStars()) {
                    star.innerHTML = '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>';
                } else {
                    star.innerHTML = '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>';
                }
            });
        }

    }, [filledStars, handleReviewSubmit])
    
    useEffect(()=>{
        isReviewExists()
    },[])

    const goToPreviousSlide = () => {
        setCurrentSlideIndex((prevIndex) => (prevIndex === 0 ? turf.imageUrls.length - 1 : prevIndex - 1));
    };

    const goToNextSlide = () => {
        setCurrentSlideIndex((prevIndex) => (prevIndex === turf.imageUrls.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <>
            <NavBar togglePopup={togglePopup} />
            <Popup show={showPopup} onClose={togglePopup} />
            <div className='flex bg-slate-500 mt-[75px]'>
                <div className="bg-gray-100 dark:bg-gray-800 py-8">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row p-3">
                            <div className="md:flex-1 p-4">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{turf.turfName}</h2>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                    {turf.location}
                                </p>
                                <div className="mb-4">
                                    <div className="mb-4">
                                        <span className="font-bold text-gray-700 dark:text-gray-300">Hourly charge: </span>
                                        <span className="text-gray-600 dark:text-gray-300">$29.99</span>
                                    </div>
                                    <div className='mr-4'>
                                        <span className="font-bold text-gray-700 dark:text-gray-300">Available Amenities:</span>
                                        {turf.tags.map((tag) => (
                                            <span className="text-gray-600 dark:text-gray-300"> {tag} |</span>
                                        ))}
                                    </div>
                                </div>
                                <span className="flex items-center mb-4">
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <span className="text-gray-600 ml-3">{reviewCount} Reviews</span>
                                </span>
                                <div className="mb-4">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Available grounds:</span>
                                    <div className="flex items-center mt-2">
                                        <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">5 X 5</button>
                                        <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">7 X 7</button>
                                    </div>
                                </div>
                                <div className='mb-4'>
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Turf Description:</span>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                        {turf.description}
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Rate us:</span>
                                    <div className="items-center mt-2">
                                        <textarea
                                            className="rounded p-2 w-64 mr-3"
                                            rows={3}
                                            value={reviewText}
                                            onChange={(e) => setReviewText(e.target.value)}
                                        />
                                        <StarRating rating={rating} onRatingChange={handleRatingChange} />
                                        <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleReviewSubmit}>
                                            Done
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="default-carousel" className="flex items-center relative" data-carousel="slide">
                    <div className="overflow-hidden rounded-lg">
                        {turf.imageUrls.map((img, index) => (
                            <div className={`duration-700 ease-in-out ${index === currentSlideIndex ? 'visible' : 'hidden'} p-5`} data-carousel-item key={index}>
                                <img className='rounded-lg h-[500px] object-cover' src={img} alt={`Slide ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                    <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
                    </div>
                    <button onClick={goToPreviousSlide} type="button" className="absolute top-0 left-3 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                            </svg>
                            <span className="sr-only">Previous</span>
                        </span>
                    </button>
                    <button onClick={goToNextSlide} type="button" className="absolute top-0 right-3 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <span className="sr-only">Next</span>
                        </span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default ViewTurf