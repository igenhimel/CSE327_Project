const Profile = require('../models/Profile')
const Flash = require('../utils/Flash')

/**
 * api method for viewing all bookmarks post
 * @param {object} req request object of the BookmarksGetController method of dashboardController
 * @param {object} res response object of the BookmarksGetController method of dashboardController
 * @param {object} next next object of the BookmarksGetController method of dashboardController
 */
exports.BookmarksGetController = async(req,res,next)=>{
    try{

        let profile = await Profile.findOne({user:req.user._id})
        .populate({
            path:'bookmarks',
            model:'Post',
            select:'title body thumbnail'
        })

        let bookmarks = []
        if(req.user){
             
            let profiles = await Profile.findOne({user:req.user._id})
    
            if(profile){
                bookmarks = profiles.bookmarks
            }
    
        }
        res.render('pages/dashboard/bookmarks',{
            title:'My Bookmarks',
            flashMessage:Flash.getMessage(req),
            path:{},
            posts:profile.bookmarks,
            bookmarks
        })

    }
    catch(e){
           next(e)
    }
}