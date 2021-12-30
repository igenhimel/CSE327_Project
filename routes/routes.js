const profileRoute = require("../routes/ProfileRoute")
const route = [

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