const User = require('../models/User')
const Profile = require('../models/Profile')
/**
 * function for check user is logged in or not
 * @returns next object 
 
 */
exports.bindUserWithRequest = () =>{

    return async (req,res,next) => {
        if(!req.session.isLoggedIn){
           return next()
        }

        try{

            let user = await User.findById(req.session.user._id)
            req.user = user
            next()

        }
        catch(e){
            console.log(e)
            next(e)
        }


    }

}

/**
 * api method for user authentication
 * @param {object} req request object of the isAuthenticated method of authMiddleware
 * @param {object} res response object of the isAuthenticated method of authMiddleware
 * @param {object} next next object of the isAuthenticated method of authMiddleware
 * @returns redirect to the login page
 */

exports.isAuthenticated = (req,res,next) =>{
    if(!req.session.isLoggedIn){
       req.flash('fail','Please Login To Your Account First')
       return res.redirect('/auth/login')
      
    }
    next() 
}


/**
 * api method of user is not aunthenicated
 * @param {object} req request object of the isUnAuthenticated method of authMiddleware
 * @param {object} res response object of the isUnAuthenticated method of authMiddleware
 * @param {object} next next object of the isUnAuthenticated method of authMiddleware
 * @returns redirect to the explorer page
 */

exports.isUnAuthenticated = (req,res,next) =>{
    if(req.session.isLoggedIn){
       return res.redirect('/explore')
      
    }
    next() 
}


/**
 * api method of user is not aunthenicated
 * @param {object} req request object of the isAuthenticated method of authMiddleware
 * @param {object} res response object of the isAuthenticated method of authMiddleware
 * @param {object} next next object of the isAuthenticated method of authMiddleware
 * @returns redirect to the error page which 404 
 */

exports.isUnAuthenticatedForJson = (req,res,next) =>{
    if(req.session.isLoggedIn || !req.session.isLoggedIn){
       return res.render('pages/error/404',{flashMessage:{},path:{}})
      
    }
    next() 
}