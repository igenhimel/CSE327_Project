const Flash = require('../utils/Flash')
const Post = require('../models/Post')
const Profile = require('../models/Profile')

 
/**
 * API Method for viewing the post creation page
 * @param {object} req - request object of the createPostGet method of postController
 * @param {object} res - response object of the createPostGet method of postController
 * @param {*} next - handling error
 */
exports.createPostGet = (req,res,next)=>{
    res.render('pages/dashboard/post/createPost',{
        title:'Create New Post',
        head:'Write Anything You Want',
        flashMessage:{},
        path:{},
        error:{},
        value:{}
    })
}
