const {ObjectID} = require('mongodb');
const mongoose = require('mongoose');

const bookingsSchema = new mongoose.Schema({
    userID: {
        type: ObjectID,
        required: [
            true, 'ID required'
        ],
        trim: true
    },
    vendorID: {
        type: ObjectID,
        required: [
            true, 'ID required'
        ],
        trim: true
    },
    serviceID: {
        type: ObjectID,
        required: [
            true, 'ID required'
        ],
        trim: true
    },
    qty: {
        type: Number,
        default: 1
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price required']
    },
    bookingDate: {
        type: Date,
        // required: [true, 'Booking date required'],
        default: Date.now()
    },
    bookingTime: {
        type: String,
        required: [true, 'Booking time required']
    },
    bookingStatus: {
        type: String,
        enum: [
            'pending', 'cancelled', 'rejected', 'accepted'
        ],
        default: 'pending'
    },
    isCanceledBy: {
        type: String,
        enum: ['customer', 'vendor']
    }
});

const Bookings = mongoose.model('Bookings', bookingsSchema);
module.exports = Bookings;
