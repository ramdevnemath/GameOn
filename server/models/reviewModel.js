import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    turfId: {
        type: Schema.Types.ObjectId,
        ref: 'Turf',
        required: true
    }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review