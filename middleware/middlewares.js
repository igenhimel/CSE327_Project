const express = require('express')
const morgan = require('morgan')
const config = require('config')
const flash = require('connect-flash')
 
const MONGODB_URI=`mongodb+srv://${config.get('db-admin')}:${config.get('db-password')}@cluster0.13eyw.mongodb.net/CSE327`

/**
 * All middlewares
 */
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended:true}),
    express.json(),
    flash()
    

]

module.exports = app =>{
    middleware.forEach(m=>{
        app.use(m)
    })
}
