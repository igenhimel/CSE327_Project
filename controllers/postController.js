const Flash = require('../utils/Flash')
const {validationResult} = require('express-validator')
const formatter = require('../utils/validationFormatter')
const cheerio =require('cheerio')
const Post = require('../models/Post')
const Profile = require('../models/Profile')
const readingTime = require('reading-time')


/**
 * API Method for viewing the post creation page
 * @param {object} req - request object of the createPostGet method of postController
 * @param {object} res - response object of the createPostGet method of postController
 * @param {object} next - next object of the createPostGet method of postController
 */
exports.createPostGet = (req, res, next) => {
    res.render('pages/dashboard/post/createPost', {
        title: 'Create New Post',
        head: 'Write Anything You Want',
        flashMessage: {},
        path: {},
        error: {},
        value: {}
    })
}

/**
 * API Method for creating new post
 * @param {*} req - request object of the createPost method of PostController 
 * @param {*} res - response object of the createPost method of postController
 * @param {*} next -next object of the createPost method of postController
 * @returns response status code
 */

exports.createPost = async (req, res, next) => {

    //error stored into this error variable
    let error = validationResult(req).formatWith(formatter)

    console.log(error.mapped())
    let {
        body,
        title,
        tags
    } = req.body
    let node = cheerio.load(body) // post body stored
    let text = node.text() // html to text convert

    //check whether validation failed or not
    if (!error.isEmpty()) {
        req.flash('fail', 'Something Error! Your Post has been Drafted')
        return res.status(400).render('pages/dashboard/post/createPost', {
            title: 'Create New Post',
            head: 'Write Anything You Want',
            flashMessage: Flash.getMessage(req),
            path: {},
            error: error.mapped(),
            value: {
                text,
                title,
                tags,
                body
            }
        })
    }
    
    if (tags) {
        tags = tags.split(',')
        tags.map(t => t.trim())
    }

    let readTime = readingTime(body).text //generating reading time

    /**
     * check user has profile or not
     */
    let profile = await Profile.findOne({
        user: req.user._id
    })
    let post = new Post({

        title,
        body,
        tags,
        author: req.user._id,
        profile: profile._id,
        thumbnail: '',
        readTime,
        likes: [],
        dislikes: [],
        comments: []


    })

    if (req.file) {
        post.thumbnail = `/uploads/${req.file.filename}`
    }


    /**
     * create new post and stored into mongodb database
     */
    try {

        let createNewPost = await post.save()

        /**
         * Find user and upadte post into their profile
         */
        await Profile.findOneAndUpdate({
            user: req.user._id
        }, {
            $push: {
                'posts': createNewPost._id
            }
        })
        req.flash('success', 'Your Post have been Successfully Posted')
        res.redirect(`/dashboard/myProfile`)

    } catch (e) {
        next(e)
    }






}