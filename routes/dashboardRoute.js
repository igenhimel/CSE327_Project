
const dashRouter = require('express').Router()

const {
  
  
    BookmarksGetController

} = require('../controllers/dashboardController')

const {
    
    isAuthenticated

} =require('../middleware/authMiddleware')




dashRouter.get('/bookmarks',isAuthenticated,BookmarksGetController)


module.exports=dashRouter