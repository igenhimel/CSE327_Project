const dashRouter = require('express').Router()
const {

    createProfileGet

} = require('../controllers/dashboardController')


/**
 * all dashboard api route
 */
dashRouter.get('/createProfile', isAuthenticated, CreateProfileGet)
dashRouter.post('/CreateProfile', profileValidator, isAuthenticated, CreateProfilePost)


module.exports = dashRouter