const post = require('express').Router()
const postValidator = require('../validators/post/postValidator')
const upload = require('../middleware/UploadMiddleware')

const {
    createPostGet,
    createPost,
    editPostGetMethod,
    editPostPostMethod,
    deletePostController
} = require('../controllers/postController')


/**
 * All routes for API POST.
 */

post.get('/createPost',createPostGet) // viewing create post page route
post.post('/createPost',upload.single('thumbnail'),postValidator,createPost) //create post route


post.get('/edit/:postId',editPostGetMethod) //loading into edit post page route
post.post('/edit/:postId',upload.single('thumbnail'),postValidator,editPostPostMethod) //update postroute

post.get('/delete/:postId',deletePostController) //delete post route
 
module.exports=post