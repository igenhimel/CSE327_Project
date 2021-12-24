const router = require('express').Router();
const {
    register
} = require("../controllers/CreateProfile")
const CreateProfile = require('./../controllers/CreateProfile')
router.get(' /register', register)

module.exports = router;