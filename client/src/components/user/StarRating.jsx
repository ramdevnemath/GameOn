import React from 'react';
import "./StarRating.css"

const StarRating = ({ rating, onRatingChange }) => {
    const totalStars = 5;

    const handleStarClick = (index) => {
        console.log(index);
        const newRating = index + 1
        onRatingChange(newRating)
        console.log(newRating)
    };

    return (
        <div className="star-rating">
            {[...Array(totalStars)].map((_, index) => {
                const isYellow = index < Math.floor(rating);
                return (
                    <button
                        key={index}
                        className={`star ${isYellow ? 'yellow' : 'text-white'}`}
                        onClick={() => handleStarClick(index)}
                    >
                        ★
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;
