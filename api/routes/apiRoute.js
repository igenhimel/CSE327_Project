const api = require('express').Router()

const {

    createCommentPost,
    repliesPostController

} = require('../controllers/commentController')


/**
 * All comment related api routes
 */
api.post('/comment/:postId', createCommentPost) // comment route

api.post('/comment/replies/:commentId', repliesPostController) //replies route

module.exports = api //exports api