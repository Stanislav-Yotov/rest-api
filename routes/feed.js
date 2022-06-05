const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const feedController = require('../controllers/feed.js');

router.get('/posts', feedController.getPosts);

router.post('/post', [
    check('title').trim().isLength({min: 5}),
    check('content').trim().isLength({min: 5})
], feedController.createPost);

module.exports = router;