const Flash = require('../utils/Flash')
const {
    validationResult
} = require('express-validator')
const formatter = require('../utils/validationFormatter')
const cheerio = require('cheerio')
const Post = require('../models/Post')
const Profile = require('../models/Profile')
const readingTime = require('reading-time')
const mongoose = require('mongoose')
const {
    generateNames
} = require('../public/scripts/generateName')
const User = require('../models/User')



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
        path: 'createPost',
        error: {},
        value: {}
    })
}

/**
 * API Method for creating a new post
 * @param {object} req - request object of the createPost method of PostController 
 * @param {object} res - response object of the createPost method of postController
 * @param {object} next -next object of the createPost method of postController
 * @returns status code 400 and render create post page
 */

exports.createPost = async (req, res, next) => {

    //error stored into this error variable
    let error = validationResult(req).formatWith(formatter)

    //generate dummy name
    let genName = generateNames()

    //console all types of error
    console.log(error.mapped())
    let {
        body,
        title,
        tags
    } = req.body // destructure all value from request body

    let node = cheerio.load(body) // post body stored
    let text = node.text() // html to text convert

    //check whether validation failed or not
    if (!error.isEmpty()) {
        req.flash('fail', 'Something Error! Your Post has been Drafted') //falsh message
        return res.status(400).render('pages/dashboard/post/createPost', {
            title: 'Create New Post',
            head: 'Write Anything You Want',
            flashMessage: Flash.getMessage(req),
            path: '{}',
            error: error.mapped(),
            value: {
                text,
                title,
                tags,
                body
            }
        })
    } // return

    //if tags available then split it.
    if (tags) {
        tags = tags.split(',')
        tags.map(t => t.trim())
    }

    let readTime = readingTime(body).text //generating reading time


    /**
     * if request user and profile both available
     */

    
    if(req.user){
        var profile = await Profile.findOne({
            user: req.user._id
        })
    }

    if (req.user && profile) {


        //save new post into mongoDB server
        var post = new Post({

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

        //if request file available
        if (req.file) {
            post.thumbnail = `/uploads/${req.file.filename}`
        }

    }

    try {


         //if user and profile both are available
        if (req.user && profile) {
            let createNewPost = await post.save()

            
             //Find user and upadte post into their profile
             
            await Profile.findOneAndUpdate({
                user: req.user._id
            }, {
                $push: {
                    'posts': createNewPost._id
                }
            })
            req.flash('success', 'Your Post have been Successfully Posted')
           return res.redirect(`/explore`)

        }
         //only user is available
        if (req.user && !profile) {

            let dummyProfile = new Profile({
                user: req.user._id,
                name: req.user.username,
                title: 'demo',
                bio: 'demo'
            })

            let createDummyProfile = await dummyProfile.save()

            await User.findOneAndUpdate({
                _id: req.user._id
            }, {
                $set: {
                    profile: createDummyProfile._id
                }
            })


            /**
             * if request user not available then used dummy data
             */
            let post = new Post({

                title,
                body,
                tags,
                author: req.user._id,
                profile: createDummyProfile._id,
                thumbnail: '',
                readTime,
                likes: [],
                dislikes: [],
                comments: []


            })

            //if request file available
            if (req.file) {
                post.thumbnail = `/uploads/${req.file.filename}`
            }

            let createNewPost = await post.save()

            /**
             * Find user and upadte post into their profile
             */

            await Profile.findOneAndUpdate({
                $push: {
                    'posts': createNewPost._id
                }
            })
            req.flash('success', 'Your Post have been Successfully Posted')
           return res.redirect(`/explore`)


        } 
        
        //if user and profile both are not available
        else {

            //create dummy user
            let dummyUser = new User({
                username: genName,
                email: 'dummy@gmail.com',
            })

            let createDummyUser = await dummyUser.save() //create dummy user

            //create dummy profile
            let dummyProfile = new Profile({
                user: createDummyUser._id,
                name: genName,
                title: 'demo',
                bio: 'demo'

            })

            let createDummyProfile = await dummyProfile.save()

            await User.findOneAndUpdate({
                _id: createDummyUser._id
            }, {
                $set: {
                    profile: createDummyProfile._id
                }
            })

            let post = new Post({

                title,
                body,
                tags,
                author: createDummyUser._id,
                profile: createDummyProfile._id,
                thumbnail: '',
                readTime,
                likes: [],
                dislikes: [],
                comments: []


            })

            //if request file available
            if (req.file) {
                post.thumbnail = `/uploads/${req.file.filename}`
            }

            let createNewPost = await post.save()

            /**
             * Find user and upadte post into their profile
             */

            await Profile.findOneAndUpdate({
                $push: {
                    'posts': createNewPost._id
                }
            })
            req.flash('success', 'Your Post have been Successfully Posted')
            res.redirect(`/explore`)

        }

    } catch (e) {
        next(e)
    }

}


/**
 * API Method for getting edit post page
 * @param {object} req - request object of the createPostGetMethod method of PostController 
 * @param {object} res - response object of the createPostGetMethod method of postController
 * @param {object} next -next object of the createPostGetMethod method of postController
 */
exports.editPostGetMethod = async (req, res, next) => {

    let postId = req.params.postId // catch postId from users request


    try {

        if (req.user) {
            //findout post is available or not
            let post = await Post.findOne({
                author: req.user._id,
                _id: postId
            })

            //if post is not available then it show page not found
            if (!post) {
                let error = new Error('404 Page Not Found')
                error.status = 404
                throw error
            }

            //if post found render into edit post [age]
            res.render('pages/dashboard/post/editPost', {
                title: 'Edit Post',
                head: 'Edit Your Post',
                path: {},
                flashMessage: Flash.getMessage(req),
                post,
                value: {},
                error: {}

            })

        } else {

            //findout post is available or not
            let post = await Post.findOne({
                    _id: postId
                }

            )

            //if post is not available then it show page not found
            if (!post) {
                let error = new Error('404 Page Not Found')
                error.status = 404
                throw error
            }

            //if post found render into edit post [age]
            res.render('pages/dashboard/post/editPost', {
                title: 'Edit Post',
                head: 'Edit Your Post',
                path: {},
                flashMessage: Flash.getMessage(req),
                post,
                value: {},
                error: {}

            })

        }


    } catch (e) {
        next(e)
    }

}


/**
 * API Method for updating a existing post
 * @param {object} req - request object of the createPostPostMethod method of PostController 
 * @param {object} res - response object of the createPostPostMethod method of postController
 * @param {object} next -next object of the createPostPostMethod method of postController
 */
exports.editPostPostMethod = async (req, res, next) => {

    let postId = req.params.postId // catch postId from users request

    let {
        title,
        body,
        tags
    } = req.body // destructure value from request body

    if (req.user) {
        //seraching into database post is available or not
        var post = await Post.findOne({
            author: req.user._id,
            _id: postId
        })
    } else {
        //seraching into database post is available or not
        var post = await Post.findOne({
            _id: postId
        })
    }

    let error = validationResult(req).formatWith(formatter)

    /**
     * validation checker and return if error found
     */
    if (!error.isEmpty()) {
        return res.render('pages/dashboard/post/editPost', {
            title: 'Edit Post',
            head: 'Edit Your Post',
            flashMessage: Flash.getMessage(req),
            path: {},
            error: error.mapped(),
            post
        })
    }

    //if tags founds split it
    if (tags) {
        tags = tags.split(',')
        tags.map(t => t.trim())
    }


    let readTime = readingTime(body).text //reading time generator

    var thumbnail = post.thumbnail

    if (req.file) {
        thumbnail = `/uploads/${req.file.filename}`
    }

    try {

        if (req.user) {

            //update post and store into database if user is available
            await Post.findOneAndUpdate({
                author: req.user._id,
                _id: postId
            }, {
                $set: {
                    title,
                    body,
                    tags,
                    thumbnail,
                    readTime
                }
            }, {
                new: true
            })

            req.flash('success', 'Post has been Updated')
            res.redirect('/explore')

        } else {

            //update post and store into database using dummyId
            await Post.findOneAndUpdate({
                _id: postId
            }, {
                $set: {
                    title,
                    body,
                    tags,
                    thumbnail,
                    readTime
                }
            }, {
                new: true
            })

            req.flash('success', 'Post has been Updated')
            res.redirect('/explore')
        }

    } catch (e) {
        next(e)
    }

}


/**
 * API Method for deleting post from the blog site
 * @param {object} req - request object of the deletePostController method of PostController 
 * @param {object} res - response object of the deletePostController method of postController
 * @param {object} next -next object of the deletePostController method of postController
 */
exports.deletePostController = async (req, res, next) => {

    let {
        postId
    } = req.params //destructure postId from request parameter

    try {

        /**
         * delete post if user is available
         */
        if (req.user) {
            let post = Post.findOne({
                author: req.user._id,
                _id: postId
            })

            //if post not found throewing an error
            if (!post) {
                let error = new Error('404 Page Not Found')
                error.status = 404
                throw error
            }

            //if found delete it from database
            await Post.findOneAndDelete({
                _id: postId
            })

            //after delete update it into database
            await Profile.findOneAndUpdate({
                user: req.user._id
            }, {
                $pull: {
                    'posts': postId
                }
            }, {
                new: true
            })

            //showing flash messgae
            req.flash('success', 'Post Deleted Successfully')
            res.redirect('/explore') //render into profile Page
        } else {


            /**
             * delete post using dummyId
             */
            let post = Post.findOne({
                _id: postId
            })

            //if post not found throewing an error
            if (!post) {
                let error = new Error('404 Page Not Found')
                error.status = 404
                throw error
            }

            //if found delete it from database
            await Post.findOneAndDelete({
                _id: postId
            })

            //showing flash messgae
            req.flash('success', 'Post Deleted Successfully')
            res.redirect('/explore') //render into profile Page
        }



    } catch (e) {
        // if error happened catch it
    }



}