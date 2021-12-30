
const dashRouter = require('express').Router()

const {
  
  
    bookmarksGetController

} = require('../controllers/dashboardController')

const {
    
    isAuthenticated

} =require('../middleware/authMiddleware')




dashRouter.get('/bookmarks',isAuthenticated,bookmarksGetController)


module.exports=dashRouter