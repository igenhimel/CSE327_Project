
/**
 * route handling
 */
const route =[


    {
        path:'/',
        controller:(req,res)=>{

            res.redirect('/explore')  // route path
           
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