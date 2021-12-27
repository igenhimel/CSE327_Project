const explore = require('express').Router()

const {
    exploreController,
    singlePageGetController
} = require('../controllers/exploreController')


/**
 * All explore sub-route added
 */

explore.get('/', exploreController)
explore.get('/:postId', singlePageGetController)

module.exports = explore