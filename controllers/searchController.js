const Post = require('../models/Post')

/**
 * API method for searching post in the database.
 * @param {object} req Request object of the postSearch method of controller
 * @param {object} res Response object of the postSearch method of controller
 */
exports.postSearch = async(req,res) => {
    let searchTerm = req.query.term; 
    let post = await Post.find({$text:{ $search: searchTerm, $diacriticSensitive: true}});
    res.render('pages/explore/search', {value: searchTerm, post} )
}