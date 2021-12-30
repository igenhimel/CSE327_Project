const searchRoute = require('express').Router()

/**
 * API for searching post
 */

const {
    postSearch
}= require('../controllers/searchController')

searchRoute.get('/',postSearch) // post search page get route.

module.exports = searchRoute
