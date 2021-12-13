const post = require('express').Router()

const {
    CreatePostGet
} = require('../controllers/postController')

const upload = require('../middleware/UploadMiddleware')

/**
 * route set for API Post
 */
post.get('/createPost',createPostGet)


module.exports=post