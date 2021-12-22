const upload = require('express').Router()
const {postImageUploadController} = require('../controllers/uploadController')
const uploads = require('../middleware/UploadMiddleware')

/**
 * upload router
 */
upload.post('/postImage',uploads.single('post-image'),postImageUploadController)

module.exports = upload 