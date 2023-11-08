import mongoose from "mongoose";
const Schema = mongoose.Schema;

const turfSchema = new Schema({
    vendorId: {
        type: Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
    turfName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    tags: [String],
    imageUrls: [String]
});

const Turf = mongoose.model('Turf', turfSchema);

export default Turf