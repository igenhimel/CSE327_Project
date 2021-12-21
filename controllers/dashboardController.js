const Profile = require('../models/Profile')

/**
 * api method for create profile page
 * @param {object} req  - request object of the createProfileGet method of dashboardController
 * @param {object} res  - response object of the createProfileGet method of dashboardController
 * @param {object} next - next object of the createProfileGet method of dashboardController
 * @returns 
 */
exports.createProfileGet = async(req, res, next) => {


    try {
        res.render('pages/dashboard/CreateProfile', {
            title: 'Create Your Account Profile',
            path: {},
            error: {},
            value: {},
            person: {
                name: "Israk",
                email: "israkrafi54@gmail.com"
            }
        })

    } catch (e) {

        next(e)

    }

}