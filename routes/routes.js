const searchRoute = require('./searchRoute')
const profileViewRoute = require('./profileViewRoute')

/**
 * routes handling
 */
const route =[

    {
        path:'/views',
        controller:profileViewRoute     // profile view route
 
    },

    {
        path:'/search',
        controller:searchRoute     // search route
 
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