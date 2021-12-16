const post = require('express').Router()
const postValidator = require('../validators/post/postValidator')
const upload = require('../middleware/UploadMiddleware')

const {
    createPostGet,
    createPost,
} = require('../controllers/postController')


/**
 * All routes for API POST.
 */

post.get('/createPost',createPostGet)
post.post('/createPost',upload.single('thumbnail'),postValidator,createPost)
 
module.exports=post