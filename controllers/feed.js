const { validationResult } = require('express-validator');

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{
            _id: '1',
            title: 'Book post', 
            content: 'This is content', 
            imageUrl: '/images/book.jpg',
            creator: {
                name: 'Stancho'
            },
            createdAt: new Date()
        }]
    });
};

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    const title = req.body.title;
    const content = req.body.content;

    res.status(201).json({
        message: 'Post created successfuly!',
        post: {
            _id: new Date().toISOString(),
            title: title,
            content: content,
            creator: {
                name: 'Stancho'
            },
            createdAt: new Date()
        }
    })
};