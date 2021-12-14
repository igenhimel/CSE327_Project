
const authRoute =  require('express').Router()
const {

    signUpGetController

} = require('../controllers/authController')

/**
 * all routes for api authentication 
 */
authRoute.get('/signup',signUpGetController)

module.exports=authRoute