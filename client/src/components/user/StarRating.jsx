import React from 'react';
import "./StarRating.css"

const StarRating = ({ rating, onRatingChange }) => {
    const totalStars = 5;

    const handleStarClick = (index) => {
        const newRating = (index + 1) / totalStars;
        onRatingChange(newRating);
        
        console.log(newRating)
    };

    return (
        <div className="star-rating">
            {[...Array(totalStars)].map((_, index) => {
                const isYellow = index < Math.floor(rating * totalStars);
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
