const Profile = require('../../models/Profile')
const Post = require('../../models/Post')
const User= require('../../models/User')

/**
 * api method for bookmarks post
 * @param {object} req request object of the bookmarksController method of bookmarksController
 * @param {object} res response object of the bookmarksController method of bookmarksController
 * @param {object} next next object of the bookmarksController method of bookmarksController
 * @returns 
 */

 exports.bookmarksController = async (req,res,next)=>{

    let {postId} = req.params //destructure postId from parameter
    
//if user is not authenticated 
    if(!req.user){
        return res.status(403).json({
            message:'You are not an authenticated User'
        })
    }

    let userId = req.user._id
    let bookmarks = null 
    try{

        let profile = await Profile.findOne({user:userId})
    //if user has a profile
        if(profile){
        if(profile.bookmarks.includes(postId)){

            await Profile.findOneAndUpdate(
                {user:userId},
                {$pull:{'bookmarks':postId}}
            )

            bookmarks=false

        }  else{ 

            await Profile.findOneAndUpdate(
                {user:userId},
                {$push:{'bookmarks':postId}},
                {new:true}
            )
            

            bookmarks=true

        }
    }
     else{ //if user has no profile 
        let dummyProfile = new Profile({
            name:req.user.username,
            title:'dummy',
            bio:'dummy',
            user:req.user._id,
            bookmarks:[]
        })

        let createDummyProfile = await dummyProfile.save()

        await User.findOneAndUpdate({
            _id:req.user._id
        },{
            $set:{profile: createDummyProfile._id}
        })

        if(createDummyProfile.bookmarks.includes(postId)){

            await Profile.findOneAndUpdate(
                {user:userId},
                {$pull:{'bookmarks':postId}}
            )

            bookmarks=false

        }  else{

            await Profile.findOneAndUpdate(
                {user:userId},
                {$push:{'bookmarks':postId}},
                {new:true}
            )

            bookmarks=true

        }
       
    }

            res.status(200).json({
            bookmarks
        })


    }
    catch(e){
        console.log(e)
        return res.status(500).json({
            error:'Server Error Occured'
        })

    }

}

/**
 * api method for viewing all post 
 * @param {object} req request object of the bookmarksViewPage method of bookmarksController
 * @param {object} res response object of the bookmarksViewPage method of bookmarksController
 * @param {object} next next object object of the bookmarksViewPage method of bookmarksController
 */

exports.bookmarksViewPage = async(req,res,next)=>{

    
  
   
    try{
      
        let posts = await Post.find()
       
        
        let bookmarks = []
        if(req.user){
             
            let profile = await Profile.findOne({user:req.user._id})
    
            if(profile){
                bookmarks = profile.bookmarks
            }
    
        }

      
          res.render('pages/explore/explore',{
              title:{},
              flashMessage:{},
              posts,
              bookmarks
          })

    }
    catch(e){
        next(e)
    }

}
