const Flash = require('../utils/Flash')
const Profile = require('../models/Profile')

/**
 * api method for create profile page
 * @param {object} req  - request object of the createProfileGet method of dashboardController
 * @param {object} res  - response object of the createProfileGet method of dashboardController
 * @param {object} next - next object of the createProfileGet method of dashboardController
 * @returns 
 */
exports.createProfileGet = async(req, res, next) => {

    let profile = await Profile.findOne({ user: req.user._id })

    try {

        if (profile) {
            return res.redirect('/dashboard/myProfile')
        }
        res.render('pages/dashboard/CreateProfile', {
            title: 'Create Your Account Profile',
            path: {},
            flashMessage: Flash.getMessage(req),
            error: {},
            value: {}
        })

    } catch (e) {

        next(e)

    }

}