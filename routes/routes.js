const authRoutes = require('../routes/authRoute')
const postRoute = require('../routes/postRoute')
const dashboardRoutes = require('../routes/dashboardRoute')
const searchRoute = require('./searchRoute')
const uploadRoutes = require('../routes/uploadRouter')
const exploreRoute = require('../routes/exploreRoute')

    /**
     * routes handling
     */
const route = [


    {
        path: '/auth',
        controller: authRoutes
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
        path: '/posts',
        controller: postRoute // posts route

    },

    {
        path: '/dashboard',
        controller: dashboardRoutes

    },
    
    {
        path:'/search',
        controller:searchRoute     // search route
 
    },

    {
        path: '/',
        controller: (req, res) => {
            res.redirect('/explore') // root path    
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