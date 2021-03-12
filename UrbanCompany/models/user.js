const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const {ObjectID} = require('mongodb');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [
            true, 'Name required'
        ],
        trim: true
    },
    email: {
        type: String,
        required: [
            true, 'Email required'
        ],
        unique: true,
        trim: true,
        lowercase: true,
        validator: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [
            true, 'Password required'
        ],
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password must not contain "Password"');
            }
        }
    },
    address: {
        type: String,
        required: [
            true, 'Address required'
        ],
        trim: true
    },
    role: {
        type: String,
        default: 'customer',
        enum: [
            'customer', 'vendor', 'admin'
        ],
        trim: true
    },
    services: [
        {
            sericeID: {
                type: ObjectID,
                trim: true
            }
        }
    ],
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    userToken: {
        type: String,
        // required: [true, 'Token required']
    },
    tokenExpiresIn: {
        type: String,
        default: new Date() + 10 * 60 * 1000 // time,
    }
});

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 8);
    next();
});

userSchema.methods.matchPassword = async function(password, encryptedPass){
    return await bcrypt.compare(password, encryptedPass);
}

const User = mongoose.model('Users', userSchema);
module.exports = User;
