const User = require('../models/user');
const Service = require('../models/service');
const Booking = require('../models/bookings');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: '../config.env'});

exports.register = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(200).json({message: 'User registered', data: user});
    } catch (e) {
        res.status(400).json({message: e.message});
    }
};

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (! user) {
            res.status(401).json({message: "No such user"});
            return;
        }
        // match user password
        const matched = await user.matchPassword(password, user.password);
        if (! matched) {
            res.status(401).json({message: 'Invalid login'});
            return;
        }
        // generate token
        const userToken = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
        
        // await User.updateOne({email}, {userToken});
        const tempUser = await User.findOneAndUpdate({email}, {userToken},  {new: true});
        res.status(201).json({message: "Logged In", data: tempUser});

    } catch (e) {
        res.status(401).json({message: e.message});
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users =  await User.find({});
        if(!users){
            throw new Error('No user found');
        }
        res.status(200).json({data: users});
    } catch (e) {
        res.status(401).json({
            message: e.message
        })
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const _id = req.params.id;
        const user =  await User.findById({_id});
        if(!user){
            throw new Error('No user found');
        }
        res.status(200).json({data: user});
    } catch (e) {
        res.status(401).json({
            message: e.message
        })
    }
};


exports.updateInfo = async (req, res) => {
    try{
        const _id = req.params.id; 
        req.body.updatedAt = Date.now();
        const user = await User.findByIdAndUpdate(_id, req.body, {new: true});
        if (!user){
            throw new Error('No such user found');
        }
        res.status(201).json({
            message: 'User Updated',
            data: user
        })
    }catch(e){
        res.status(501).json({
            message: e.message
        });
    }
};

exports.bookService = async (req, res) => {
    try {
        const userID = req.params.id;
        const {serviceID, vendorID} = req.body;
        const service = await Service.findOne({_id: serviceID });
        const vendor = await User.findOne({_id: vendorID });
        const user = await User.findOne({_id: userID });

        if (!service || !vendor || vendor.role !== 'vendor' || !user) {
            throw new Error('Invalid Request');
        }
        const total = req.body.qty * service.price;
        req.body.totalPrice = total;
        req.body.userID = userID;
        console.log(req.body);
        const booking = await Booking.create(req.body);
        res.status(200).json({
            message: 'Service Booked',
            invoice: booking
        });
    } catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
};

exports.listBookings = async (req, res) => {
    try{
        const _id = req.params.id;
        const bookings = await Booking.find({userID: _id});
        if(!bookings){
            throw new Error('Invalid request');
        }
        res.status(200).json({
            message: 'Your bookings',
            bookings
        });
    }catch(e){
        res.status(501).json({
            message: e.message
        });
    }
};

exports.listAllBookings = async (req, res) => {
    try{
        // const _id = req.params.id;
        const bookings = await Booking.find({});
        if(!bookings){
            throw new Error('Invalid request');
        }
        res.status(200).json({
            message: 'Bookings',
            bookings
        });
    }catch(e){
        res.status(501).json({
            message: e.message
        });
    }
};

exports.deleteUser = async (req, res) => {
    try{
        const _id = req.params.id;
        const user = await User.findByIdAndDelete(_id);
        if (!user){
            throw new Error('No such user found');
        }
        res.status(200).json({
            message: 'User Deleted' 
        });
    }catch(e){
        res.status(501).json({
            message: e.message
        });
    }
};