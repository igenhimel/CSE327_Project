
/**
 * API Method for uploading picture 
 * @param {object} req - request object of the postImageUploadController method of uploadController
 * @param {object} res - response object of the postImageUploadController method of uploadController
 * @param {object} next - next object of the postImageUploadController method of uploadController
 * @returns response status code 
 */
exports.postImageUploadController = (req,res,next)=>{

    if(req.file){ 
       return res.status(200).json({
            imageURL:`/uploads/${req.file.filename}`
        })
    } // if request file available then upload

    return res.status(500).json({
        message:'File Upload Failed'
    }) // otherwise file upload failed

}