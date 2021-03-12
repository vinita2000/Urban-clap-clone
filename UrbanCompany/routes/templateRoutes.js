const express = require('express');
const {indexPage, loginPage, profilePage, registerPage} = require('../controllers/templateControllers');
const router = new express.Router();

router.get('/', indexPage);

router.get('/login', loginPage);

router.get('/register', registerPage);

router.get('/profile', profilePage);


module.exports = router;