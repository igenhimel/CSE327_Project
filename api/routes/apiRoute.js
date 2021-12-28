
const api = require('express').Router()



const {

    bookmarksController,
    bookmarksViewPage

} = require('../controllers/bookmarksController')



const {isAuthenticated} = require('../../middleware/authMiddleware')

api.get('/bookmarks/:postId',isAuthenticated,bookmarksController)
api.get('/bookmarks',isAuthenticated,bookmarksViewPage)

module.exports = api