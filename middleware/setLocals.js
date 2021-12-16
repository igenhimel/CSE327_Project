
/**
 * method for global user
 * @returns user is logged in or not
 */
exports.setLocals = () =>{
    return async (req,res,next) =>{
        res.locals.user = req.user
        res.locals.isLoggedIn = req.session.isLoggedIn
        
    }
}

