const Post = require('../models/Post')

/**
 * API method for searching post in the database.
 * @param {object} req Request object of the post_search method of controller
 * @param {object} res Response object of the post_search method of controller
 */
exports.postSearch = async(req,res) => {
    let searchterm = req.query.search;
    let post = await Post.find({$text:{ $search: searchterm, $diacriticSensitive: true}});
    res.render('/pages/explore/search', {value: searchterm, post})
}

