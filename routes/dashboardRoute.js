const dashRouter = require('express').Router()
const {

    createProfileGet

} = require('../controllers/dashboardController')


/**
 * all dashboard api route
 */
dashRouter.get('/createProfile', createProfileGet)


module.exports = dashRouter