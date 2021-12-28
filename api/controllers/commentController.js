const Post = require('../../models/Post')
const Comment = require('../../models/Comment')
const moment = require('moment')
const Profile = require('../../models/Profile')
const {
    generateNames
} = require('../../public/scripts/generateName')
const User = require('../../models/User')


/**
 * API Method for commenting into a post
 * @param {object} req - request object of the createCommentPost method of commentController
 * @param {object} res - response object of the createCommentPost method of commentController
 * @param {object} next - next object of the createCommentPost method of commentController
 * @returns response status code 201 and response commentJSON file
 */
exports.createCommentPost = async (req, res, next) => {

    let {postId} = req.params //destructure post Id
    let {body} = req.body // destructure comment body

    try {

        //if user and profile both available
        if (req.user && req.user.profile) {

            let comment = new Comment({
                post: postId,
                user: req.user._id,
                body,
                replies: []
            }) 

            let createdComment = await comment.save() // new comment saved into database

            //update post with comment
            await Post.findOneAndUpdate({
                _id: postId
            }, {
                $push: {
                    'comments': createdComment._id
                }
            })

            let commentJSON = await Comment.findById(createdComment._id) // destructure single comment into JSON object
                .populate({
                    path: 'user',
                    select: 'profilePic username'
                }) //populate profile picture and username from User Model
                .populate({
                    path: 'user',
                    populate: {
                        path: 'profile',
                        select: 'name'
                    }
                }) //populate name from Profile model

            return res.status(201).json(commentJSON) // response return

        }

        //if user available but profile not available
        if (req.user && !req.user.profile) {

            //dummy username function called
            let genName = generateNames()

            //created dummy Profile
            let dummyProfile = new Profile({
                user: req.user._id,
                name: genName,
                title: 'demo',
                bio: 'demo'

            })

            //create dummy profile
            let createDummyProfile = await dummyProfile.save()

            await User.findOneAndUpdate({
                _id: req.user._id
            }, {
                $set: {
                    profile: createDummyProfile._id
                }
            }) //dummy profile updated into dummy user

            
            let comment = new Comment({
                post: postId,
                user: req.user._id,
                body,
                replies: []
            }) // new comment objected created

            let createdComment = await comment.save() //comment save

            /**
             * dummy comment saved into database
             */
            await Post.findOneAndUpdate({
                _id: postId
            }, {
                $push: {
                    'comments': createdComment._id
                }
            })

            let commentJSON = await Comment.findById(createdComment._id)
                .populate({
                    path: 'user',
                    select: 'profilePic username'
                })
                .populate({
                    path: 'user',
                    populate: {
                        path: 'profile',
                        select: 'name'
                    }
                })

            return res.status(201).json(commentJSON)

        } 
        
        //if user and profile both not available
        else {
            
            
            //dummy username function called
            let genName = generateNames()

            let dummyUser = new User({
                username: genName,
                email: 'dummy@gmail.com',
            }) //created dummy user

            let createDummyUser = await dummyUser.save()

            //created dummy Profile
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
            }) //dummy profile updated into dummy user


            let comment = new Comment({
                post: postId,
                user: createDummyUser._id,
                body,
                replies: []
            }) // new comment objected created

            let createdComment = await comment.save() //comment save

            /**
             * dummy comment saved into database
             */
            await Post.findOneAndUpdate({
                _id: postId
            }, {
                $push: {
                    'comments': createdComment._id
                }
            })

            let commentJSON = await Comment.findById(createdComment._id)
                .populate({
                    path: 'user',
                    select: 'profilePic username'
                })
                .populate({
                    path: 'user',
                    populate: {
                        path: 'profile',
                        select: 'name'
                    }
                })

            return res.status(201).json(commentJSON)
        }


    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: 'Server Error Occured'
        }) //if error occured response back 500 internal server error

    }



}

/**
 * API Method for replying into a comment
 * @param {object} req -request object of the repliesPostController method of commentController
 * @param {object} res -response object of the repliesPostController method of commentController
 * @param {object} next -next object of the repliesPostController method of commentController
 * @returns response status code 201 and JSON file
 */
exports.repliesPostController = async (req, res, next) => {

    let {commentId} = req.params //destructure comment ID
    let {body} = req.body // destructure replies body

       try {

        //if user and profile is available
        if (req.user && req.user.profile) {
            let reply = {
                user: req.user._id,
                body
            }

            //find comment and push replies into comment
            await Comment.findOneAndUpdate({
                _id: commentId
            }, {
                $push: {
                    'replies': reply
                }
            })

            //find profile
            let profile = await Profile.findOne({
                user: req.user._id
            })

            //return back replies JSON file and status code 201
            return res.status(201).json({
                ...reply,
                profilePic: req.user.profilePic,
                name: profile.name
            })


        }

            /**
             * if user available but profile not then use dummy data
             * generate dummy user and profile from geneerateName()
             */
        if (req.user && !req.user.profile) {
            
            let genName = generateNames()

            //dummy profile object created
            let dummyProfile = new Profile({

                user: req.user._id,
                name: genName,
                title: 'demo',
                bio: 'demo'

            })

            let createDummyProfile = await dummyProfile.save()

            //dummy replies
            await User.findOneAndUpdate({
                _id: req.user._id
            }, {
                $set: {
                    profile: createDummyProfile._id
                }
            })

            let reply = {
                user: req.user._id,
                body
            }

            //dummy replies push into comment body
            await Comment.findOneAndUpdate({
                _id: commentId
            }, {
                $push: {
                    'replies': reply
                }
            })

            let profile = await Profile.findOne({
                user: req.user._id
            })

            //response back to the user
            return res.status(201).json({
                ...reply,
                profilePic: req.user.profilePic,
                name: profile.name
            })

        }
        
           /**
             * if user and profile both not available use dummy data
             * generate dummy user and profile from geneerateName()
             */
        else {

         
            let genName = generateNames()

            let dummyUser = new User({
                username: genName,
                email: 'dummy@gmail.com',
            }) // dummy user created

            let createDummyUser = await dummyUser.save()

            //dummy profile object created
            let dummyProfile = new Profile({

                user: createDummyUser._id,
                name: genName,
                title: 'demo',
                bio: 'demo'

            })

            let createDummyProfile = await dummyProfile.save()

            //dummy replies
            await User.findOneAndUpdate({
                _id: createDummyUser._id
            }, {
                $set: {
                    profile: createDummyProfile._id
                }
            })



            let reply = {
                user: createDummyUser._id,
                body
            }

            //dummy replies push into comment body
            await Comment.findOneAndUpdate({
                _id: commentId
            }, {
                $push: {
                    'replies': reply
                }
            })

            let profile = await Profile.findOne({
                user: createDummyUser._id
            })

            //response back to the user
            return res.status(201).json({
                ...reply,
                profilePic: createDummyUser.profilePic,
                name: profile.name
            })

        }

    } catch (e) {

        console.log(e)
        return res.status(500).json({
            error: 'Server Error Occured'
        }) // if server error happened return 500 status code

    }



}