const authRoute = require('../routes/authRoute')
const postRoute = require('../routes/postRoute')
const uploadRoutes = require('../routes/uploadRouter')
const exploreRoute = require('../routes/exploreRoute')
const apiRoute = require('../api/routes/apiRoute')
/**
 * routes handling
 */
const route =[

    {
        path:'/auth',
        controller:authRoute   

    },

    {
        path:'/posts',
        controller:postRoute     // posts route
 
    },

    {
        path:'/uploads',
        controller:uploadRoutes // upload route

    },

    {
        path:'/api',
        controller:apiRoute

    },

    {
        path:'/explore',
        controller:exploreRoute
    },
 
    {
        path:'/',
        controller:(req,res)=>{

            res.redirect('/explore')  // root path
           
        }
    }

]


module.exports = (app)=>{
    route.forEach((r)=>{
       if(r.path=='/'){
           app.get(r.path,r.controller)
       }
       else{
        app.use(r.path,r.controller)
       }
    })
}