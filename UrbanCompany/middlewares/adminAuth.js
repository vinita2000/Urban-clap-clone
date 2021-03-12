const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config({ path: '../config.env' });

const auth = async (req, res, next) => {
    try {
        const userToken = req.header('Authorization');
        // check if token is valid and hasn't expired
        const decoded = jwt.verify(userToken, process.env.JWT_SECRET);
        const user = await User.findOne({userToken});
        if (!user || user.role !== 'admin'){
            throw new Error();
        }
        next();
    } catch (e) {
        res.status(401).json({message: 'Authorization failed !'});
    }
};
module.exports = auth;
