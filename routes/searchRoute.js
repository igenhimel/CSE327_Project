const searchRoute = require('express').Router()

const {
    postSearch
}= require('../controllers/searchController')

searchRoute.get('/',postSearch)

module.exports = searchRoute
