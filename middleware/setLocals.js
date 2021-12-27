const cheerio = require('cheerio')
const moment = require('moment')

/**
 * variable are declared globally
 * @returns post body 
 */

exports.setLocals = () =>{
    return async (req,res,next) =>{
        res.locals.user = req.user
        res.locals.isLoggedIn = req.session.isLoggedIn
        res.locals.truncate = html =>{

            let node = cheerio.load(html) // cherrio html to text converter
            let text = node.text() // html to text convert

            text = text.replace(/(\r\n|\n|\r)/gm,'') 

            if(text.length<=100){
                return text
            } // if text length <=100 then return text

            else{
               return text.substr(0,100) + '...' //otherwise text...
            }
        }
        res.locals.moment = time => moment(time).fromNow() //locally declare momentJS variable to access from view
        next()

    }
}

