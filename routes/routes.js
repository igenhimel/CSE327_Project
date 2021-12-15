
const authRoutes = require('../routes/authRoute')
const postRoute = require('../routes/postRoute')

/**
 * routes handling
 */
const route =[

    
    {
        path:'/auth',
        controller:authRoutes
    },

    {
        path:'/posts',
        controller:postRoute     // posts route
 
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

