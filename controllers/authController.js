let User = require('../models/User')
const session = require('express-session')
const Flash = require('../utils/Flash')
/**
 * api method for viewing the signup page-
 * @param {object} req request object of the signUpGetController method of authController
 * @param {object} res response object of the signUpGetController method of authController
 * @param {object} next handling error of the signUpGetController method of authController
 */
exports.signUpGetController = (req,res,next)=>{
 
 
    res.render('pages/auth/signup',{
      
      title:'Sign Up To Diary of Dreams',
      path:'signpath',
      error:{},
      value:{},
      flashMessage:Flash.getMessage(req)
    
    })

}
