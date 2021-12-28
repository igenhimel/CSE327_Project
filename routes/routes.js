const authRoutes = require('../routes/authRoute')
const apiRoute = require ('../api/routes/apiRoute')
const dashboardRoutes = require('../routes/dashboardRoute')


const route = [

    {
        path:'/auth',
        controller:authRoutes
    },
    
    {
        path:'/api',
        controller:apiRoute

    },

    
    {
        path:'/dashboard',
        controller:dashboardRoutes
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

