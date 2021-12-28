const api = require('express').Router()

const {

    createCommentPost,
    repliesPostController

} = require('../controllers/commentController')

const {

    bookmarksController,
    bookmarksViewPage

} = require('../controllers/bookmarksController')

const {isAuthenticated} = require('../../middleware/authMiddleware')

/**
 * All comment related api routes
 */
api.post('/comment/:postId', createCommentPost) // comment route

api.post('/comment/replies/:commentId', repliesPostController) //replies route

/**
 * all bookmarks related api routes
 */
api.get('/bookmarks/:postId',isAuthenticated,bookmarksController)
api.get('/bookmarks',isAuthenticated,bookmarksViewPage)

module.exports = api

