const multer = require('multer')
const path = require('path')

/**
 * multer configuration file added
 */
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{

        cb(null,'public/uploads') // destination file 

    },
    filename: (req,file,cb)=>{
        cb(null,file.fieldname+'_'+Date.now()+'_'+file.originalname) // changing file name with current date 
    }
})

/**
 * multer configuration 
 */
const upload = multer({
    storage,
    limits:{
        fileSize:1024* 1024 * 5 //image size should be less than 5MB
    },
    fileFilter: (req,file,cb)=>{
        const types = /jpeg|jpg|png|gif/  //image file should be jpeg,jpg,png or gif
        const extName = types.test(path.extname(file.originalname).toLowerCase()) // file name will be lowercase
        const mimeType = types.test(file.mimetype)

        if(extName && mimeType){
            cb(null,true)
        }
        else{
            cb(new Error('Only Support Images')) //callback
        }
        
    }
})

module.exports = upload