const express = require('express')
const morgan = require('morgan')
const config = require('config')


const MONGODB_URI=`mongodb+srv://${config.get('db-admin')}:${config.get('db-password')}@cluster0.13eyw.mongodb.net/CSE327`

/**
 * All middleware
 */
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended:true}),
    express.json()
    

]

module.exports = app =>{
    middleware.forEach(m=>{
        app.use(m)
    })
}
