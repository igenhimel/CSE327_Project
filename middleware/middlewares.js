const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash')
const config = require('config')
const {setLocals} = require('../middleware/setLocals')


//mongodb database uri
const MONGODB_URI=`mongodb+srv://${config.get('db-admin')}:${config.get('db-password')}@cluster0.13eyw.mongodb.net/diary`

//session store into mongo
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
  });

  /**
   * All middleware updated here
   */
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended:true}),
    express.json(),
    session({
        secret:'keyboard cat',
        resave:false,
        saveUninitialized:false,
        store:store,
        cookie : {
            maxAge: 1000* 60 * 60 *24 * 365
        }
    }),
    flash(), //flashMessage middleware
    setLocals()//setLocal middleware
]

module.exports = app =>{
    middleware.forEach(m=>{
        app.use(m)
    })
}
