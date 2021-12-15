
const dashboardRoutes = require('../routes/dashboardRoute')

const route = [

 
    {
        path:'/dashboard',
        controller:dashboardRoutes

    },
    {
        path:'/',
        controller:(req,res)=>{

            res.redirect('/explore')
           
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