const ProfileRouter = require('express').Router()
const {
createProfileGet,
createProfilePost
} = require('../controllers/CreateProfile')

ProfileRouter.get('/createProfile',createProfileGet)
ProfileRouter.post('/createProfile',createProfilePost)

module.exports = ProfileRouter