const {Schema,model} =require('mongoose')
/**
 * database model for Post
 */
const PostSchema =new Schema({
 
    title:{ 
        type:String,
        trim:true,
        required:true
    },

    body:{
        type:String,
        required:true
    },

    author:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    profile:{

        type:Schema.Types.ObjectId,
        ref:'Profile',
        required:true

    },
    tags:{
        type:[String]
    },
    thumbnail:String,
    readTime:String,

    likes:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    dislikes:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],

    comments:[{
        type:Schema.Types.ObjectId,
        ref:'Comment'
    }]

},{timestamps:true})





const Post =model("Post",PostSchema)

module.exports = Post