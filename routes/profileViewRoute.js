const profileViewRoute = require('express').Router()
/**
 * API for viewing profile
 */

const {
    profileView
}= require('../controllers/profileViewController')

profileViewRoute.get('/',profileView) // Viewing user profile route.

module.exports = profileViewRoute