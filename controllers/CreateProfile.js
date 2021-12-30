const User = require('../models/User')
const Profile = require('../models/Profile')
const mongoose = require('mongoose')

exports.createProfileGet = async(req, res, next) => {
    res.render('pages/dashboard/CreateProfile', {
        title: 'Create Your Profile'
    })

}


exports.createProfilePost = async(req, res, next) => {

    let { name, title, bio, website, facebook, twitter } = req.body

    try {

        if (req.user) {
            let profile = await Profile.findOne({
                author: req.user._id
            })

            if (profile) {
                return res.redirect('/profile/myProfile')
            } else {
                let createNewProfile = new Profile({
                    name,
                    title,
                    bio,
                    profilePic: req.user.ProfilePic,
                    links: {
                        website: website || '',
                        facebook: facebook || '',
                        twitter: twitter || ''
                    }
                })

                let createProfile = await createNewProfile.save()

                await User.findOneAndUpdate({
                    _id: req.user._id
                }, {
                    $set: { 'profile': createProfile._id }
                })

                return res.redirect('/profile/myProfile')


            }
        } else {

            let checkUser = mongoose.Types.ObjectId();

            let profile = new Profile({
                user: checkUser._id,
                name,
                title,
                bio,
                profilePic: '',
                links: {
                    website: website || '',
                    facebook: facebook || '',
                    twitter: twitter || ''
                },
                posts: [],
                bookmarks: []
            })

            await profile.save()

            return res.redirect('/profile/myProfile')



        }
    } catch (e) {

        next(e)

    }

    try {
        let result = await collection.findOne({ "_id": request.params.username });
        response.send(result);
    } catch (e) {
        response.status(500).send({ message: e.message });
    }
};