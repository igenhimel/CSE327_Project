const searchRoute = require('./searchRoute')
/**
 * routes handling
 */
const route =[


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