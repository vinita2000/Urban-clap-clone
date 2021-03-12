const express = require('express');
const {
    register,
    login,
    getAllUsers,
    updateInfo,
    bookService,
    listBookings,
    deleteUser,
    getUserProfile,
    listAllBookings
} = require('../controllers/userController');
const adminAuth = require('../middlewares/adminAuth');
const userAuth = require('../middlewares/userAuth');
const router = new express.Router();

router.route('/api/user/register').post(register);
router.route('/api/user/login').put(login);
router.route('/api/user/list-users').get(adminAuth, getAllUsers);
router.route('/api/user/profile/:id').get(userAuth, getUserProfile);
router.route('/api/user/update-info/:id').put(userAuth, updateInfo);
router.route('/api/user/book-service/:id').post(userAuth, bookService);
router.route('/api/user/list-bookings/:id').get(userAuth, listBookings);
router.route('/api/user/list-all-bookings').get(adminAuth, listAllBookings);
router.route('/api/user/delete-user/:id').delete(adminAuth, deleteUser);

module.exports = router;
