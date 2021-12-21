const dashboardRoutes = require('../routes/dashboardRoute')
const profileRoute = require("../routes/CreateProfile")
const route = [


    {
        path: '/dashboard',
        controller: dashboardRoutes

    },
    {
        path: "/profile",
        controller: profileRoute
    },
    {
        path: '/',
        controller: (req, res) => {

            res.redirect('/explore')

        }
    }


]

module.exports = (app) => {
    route.forEach((r) => {
        if (r.path == '/') {
            app.get(r.path, r.controller)
        } else {
            app.use(r.path, r.controller)
        }
    })
}