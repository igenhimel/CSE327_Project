const Post = require('../models/Post')

/**
 * API method for searching post in the database.
 * @param {object} req Request object of the profileView method of controller
 * @param {object} res Response object of the profileView method of controller
 */
exports.profileView = async(req,res) => {
    let post = await Post.find().sort({created_at: -1});
    res.render('pages/explore/profileView', {post})
}