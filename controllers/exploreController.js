const Flash = require('../utils/Flash')
const Post = require('../models/Post')
const moment = require('moment')
const Profile = require('../models/Profile')
const {
    post
} = require('jquery')


/**
 * Extract date and time from genDate()
 * @param {integer} days - take integer input number as days 
 * @returns subtract recent day to given paramater days and shows the difference
 **/

function genDate(days) {

    let date = moment().subtract(days, 'days') // subtract recent day to given day
    return date.toDate() // return date

}

/**
 * filtering post which posted in a week,month or recents
 * @param {string} filter - take a string input as 'week','recent','months'
 * @returns subtract recent day to given paramater days and shows the difference and provide 1 week,months ago post
 */
function filteringData(filter) {
    let filterObj = {}
    let order = 1 //descending order

    switch (filter) {
        case 'week':
            filterObj = {
                createdAt: {
                 $gt: genDate(7) // filtering post which posted 7 days ago
                }
            }
            order = -1
            break;

        case 'month':

            filterObj = {
                createdAt: {
                    $gt: genDate(30) //filtering post which posted 30 days ago
                }
            }
            order = -1
            break;

        case 'all':

            order = -1 //other wise post shows in recent accending order
            break;

        default:
            break;
    }

    return {
        filterObj, //return filterObject and order
        order
    }
}

/**
 * API Method for view all post
 * @param {object} req -request object of the exploreController method of exploreController
 * @param {obejct} res -rsponse object of the exploreController method of exploreController
 * @param {object} next -next object of the exploreController method of exploreController
 */

exports.exploreController = async (req, res, next) => {



    let filter = req.query.filter || 'recent' // destructure filter data from request query
    let currentPage = parseInt(req.query.page) || 1 // pagination - current page number
    let itemPerPage = 2 // item per page is 2
    let totalPost = await Post.countDocuments() // total post count from databse query
    let totalPage = Math.ceil(totalPost / itemPerPage) // total page count

    let {
        filterObj,
        order
    } = filteringData(filter.toLowerCase()) // dsetructure filterobject and order

    try {

        let posts = await Post.find(filterObj) //find post by filtering object
            .skip((currentPage * itemPerPage) - itemPerPage) // skip previous page post
            .limit(itemPerPage) // limit post per page = 2
            .sort(order == 1 ? '-createdAt' : 'createdAt') //sorting post
            .populate('profile', 'name username profilePic') // populating name,username and profilePic from Profile Model

            
            let bookmarks = [] //empty array
            if(req.user){
             
            let profile = await Profile.findOne({user:req.user._id})
    
            if(profile){
                bookmarks = profile.bookmarks
            }      //if profile then bookmarks icon can be show in explore page
    
        }


        res.render('pages/explore/explore', {
            title: 'Explore The World',
            path: 'explore',
            flashMessage: Flash.getMessage(req),
            filter,
            posts,
            itemPerPage,
            currentPage,
            totalPage,
            bookmarks
        }) //response render to the explore page 

    } catch (e) {
        next(e)
    }



}


/**
 * APIMethod for viewing single Post
 * @param {object} req -request object of the singlePageGetController method of exploreController
 * @param {object} res -response object of the singlePageGetController method of exploreController
 * @param {object} next -next object of the singlePageGetController method of exploreController
 */

exports.singlePageGetController = async (req, res, next) => {

    let {
        postId
    } = req.params //destructure post Id

    try {

        let post = await Post.findById(postId)
            .populate('author profile', 'name username profilePic')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: 'username profilePic'
                }
            })// find post and populate username and profilePic from User Model
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    populate: {
                        path: 'profile',
                        select: 'name'
                    }
                }
            })// find post and populate name from Profile Model who comment into post
            .populate({
                path: 'comments',
                populate: {
                    path: 'replies.user',
                    select: 'username profilePic'
                }
            }) // find post and populate replies,username and profilePic from Comment Model who comment
            .populate({
                path: 'comments',
                populate: {
                    path: 'replies.user',
                    populate: {
                        path: 'profile',
                        select: 'name'
                    }
                }
            })// find post and populate name from Profile Model who replies into comment

        if (!post) {

            let error = new Error('Page Not Found') // if post not found throw an error
            error.status(404)
            throw error

        } else {

            res.render('pages/explore/singlePage', {
                title: post.title,
                path: {},
                flashMessage: Flash.getMessage(req),
                post
            }) //else render to the single post view page
        }
    } catch (e) {
        next(e)
    }


}