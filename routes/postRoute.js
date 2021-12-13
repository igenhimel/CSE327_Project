const post = require('express').Router()

const {
    CreatePostGet
} = require('../controllers/postController')

const upload = require('../middleware/UploadMiddleware')

/**
 * API set for Post Controller
 */
post.get('/createPost',CreatePostGet)


module.exports=post