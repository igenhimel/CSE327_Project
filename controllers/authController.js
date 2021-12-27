let User = require('../models/User') //User model is importing
let bcrypt = require('bcrypt') // it's a library which will use for hasing
const {
  validationResult
} = require('express-validator')
const errorFormatter = require('../utils/validationFormatter')
const session = require('express-session')
const Flash = require('../utils/Flash')
const Profile = require('../models/Profile')

/**
 * api method for viewing the signup page-
 * @param {object} req request object of the signUpGetController method of authController
 * @param {object} res response object of the signUpGetController method of authController
 * @param {object} next next object of the signUpGetController method of authController
 */
exports.signUpGetController = (req, res, next) => {


  res.render('pages/auth/signup', {

    title: 'Sign Up To Diary of Dreams',
    path: 'signpath',
    error: {},
    value: {},
    flashMessage: Flash.getMessage(req)

  })

}



/**
 * api method for register new account-
 * @param {object} req request object of the signUpPostController method of authController
 * @param {object} res response object of the signUpPostController method of authController
 * @param {object} next next object of the signUpPostController method of authController
 */


exports.signUpPostController = async (req, res, next) => {

//destructuring username,email,password from body
  let {
    username,
    email,
    password,
    
  } = req.body

  let errors = validationResult(req).formatWith(errorFormatter)  // store error message 
  console.log(errors.mapped())
  if (!errors.isEmpty()) {
    req.flash('fail', 'Please Check Your Form')

    return res.render('pages/auth/signup', {

      title: 'Sign Up To Diary of Dreams',
      path: 'signpath',
      error: errors.mapped(),
      value: {
        username,
        email,
        password
      },
      flashMessage: Flash.getMessage(req)

    })
  }


  try {
//we will encrypt the pass and will encrypt 11 times. promise handled by await 
    let hashPassword = await bcrypt.hash(password, 11) // encrypted password and 11 times encrypted
//user data save into mongodb database
    let user = new User({
      username,
      email,
      password: hashPassword // pass replaced by hashPass
    })

   
    let createUser= await user.save()  

    let dummyProfile = new Profile({
      name:createUser.username,
      title:'abc',
      bio:'abc',
      user:createUser._id
    })

    let createDummyProfile= await dummyProfile.save()

    await User.findByIdAndUpdate({
      _id:createUser._id
    },{
      $set:{'profile': createDummyProfile._id}
    })

    req.flash('success', 'Please Login To Your Account')
    res.redirect('/auth/login')


  } catch (e) {
    console.log(e)
    next(e)
  }


}

/**
 * api method for viewing login page
 * @param {object} req request object of the loginGetController method of authController
 * @param {object} res response object of the loginGetController method of authController
 * @param {object} next next object of the loginGetController method of authController
 */


exports.loginGetController = (req, res, next) => {

  res.render('pages/auth/login', {
    title: 'Log In To Your Account',
    path: 'logpath',
    error: {},
    value: {},
    ErrorPass: {},
    flashMessage: Flash.getMessage(req)
  })
}


/**
 * api method for user login
 * @param {object} req request object of the loginPostController method of authController 
 * @param {object} res response object of the loginPostController method of authController 
 * @param {object} next next object of the loginPostController method of authController 
 * @returns 
 */
exports.loginPostController = async (req, res, next) => {

  let {
    email,
    password
  } = req.body  // data destructure from request body
  let errors = validationResult(req).formatWith(errorFormatter)
  let user = await User.findOne({ 
    email
  }) // check email id available or not 

  try {
// validation check 
    if (!errors.isEmpty()) {
      req.flash('fail', 'Authentication Failed!')
      return res.render('pages/auth/login', {
        title: 'Log In To Your Account',
        path: 'logpath',
        error: errors.mapped(),
        ErrorPass: {},
        flashMessage: Flash.getMessage(req)
      })

    }

    let match = await bcrypt.compare(password, user.password) //compare password 

    if (!match) {
      req.flash('fail', 'Authentication Failed!')
      let myError = {}
      myError.password = 'Incorrect Username Or Password'
      return res.render('pages/auth/login', {
        title: 'Log In To Your Account',
        path: 'logpath',
        error: {},
        ErrorPass: myError,
        flashMessage: Flash.getMessage(req)

      })

    }

// login session store into database 
    req.session.isLoggedIn = true,
      req.session.user = user,
      req.session.save(err => {
        if (err) {
          console.log(err)
          return next(err)
        } else {
          req.flash('success', 'Successfully Logged In')
          res.redirect('/dashboard/myProfile')
        }
      })

  } catch (e) {
    console.log(e)
    next(e)
  }



}

/**
 * api method for google authentication
 * @param {object} req request object of the googlePostController method of authController  
 * @param {object} res response object of the googlePostController method of authController
 * @param {object} next next object of the googlePostController method of authController
 */
exports.googlePostController = async (req, res, next) => {

  try {

//login session store into database
    req.session.isLoggedIn = true,
      req.session.user = req.user._id,
      req.session.save(err => {
        if (err) {
          console.log(err)
          return next(err)
        } else {
          req.flash('success', 'Successfully Logged In')
          res.redirect('/dashboard/myProfile')
        }
      })

  } catch (e) {
    console.log(e)
    next(e)
  }

}


/**
 * api method for logout user-
 * @param {object} req request object of the logoutController method of authController
 * @param {object} res response object of the logoutController method of authController
 * @param {object} next next object handling error of the logoutController method of authController
 */

exports.logoutController = (req, res, next) => {
//login session destroy 
  req.session.destroy(err => {

    if (err) {
      console.log(err)
      return next(err)
    } else {
      res.redirect('/auth/login')
    }

  })

}

/**
 * api method for getting real time validation
 * @param {object} req request object of the realTimeValidation method of authController 
 * @param {object} res response object of the realTimeValidation method of authController
 * @param {object} next next object of the realTimeValidation method of authController
 */

exports.realTimeValidation = (req, res, next) => {
  User.find()
    .then(data => {
      res.status(200).json(data)
    })
}
