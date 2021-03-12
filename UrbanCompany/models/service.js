const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description required'],
        trim: true
    },
    serviceTime: {
        type: String,
        trim: true,
        required: [true, 'Time required']
    },
    isAvailable: {
        type: Boolean,
        default: true,
        trim: true
    },
    categoryID: {
        type: ObjectID,
        required: [true, 'Category ID required'],
        trim: true
    },
    vendorID: {
        type: ObjectID,
        required: [true, 'Vendor ID required'],
        trim: true
    } 
});

const Service = mongoose.model('services', serviceSchema);
module.exports = Service;