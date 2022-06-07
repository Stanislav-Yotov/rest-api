const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const User = require('../models/user.js');
const authController = require('../controllers/auth.js');
const isAuth = require('../middleware/is-auth.js');

router.put('/signup', [
    check('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom((value, { req }) => {
        return User.findOne({ email: value })
        .then(userDoc => {
            if (userDoc) {
                return Promise.reject('Email already exists');
            }
        });
    })
    .normalizeEmail(),
    check('password').trim().isLength({min: 5}),
    check('name').trim().not().isEmpty()
], authController.signup);

router.post('/login', authController.login);

router.get('/status', isAuth, authController.getUserStatus);

module.exports = router;