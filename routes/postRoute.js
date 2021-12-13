const post = require('express').Router()

const {
    createPostGet
} = require('../controllers/postController')

const upload = require('../middleware/UploadMiddleware')

/**
 * All routes for API POST
 */
post.get('/createPost',createPostGet)


module.exports=post