/**
 * Flash alert message configuration file
 * Flash class
 */
class Flash{
    constructor(req){
        this.req=req
        this.success = this.extractFlashMessage('success')
        this.fail = this.extractFlashMessage('fail')
        
    }

    /**
     * 
     * @param {string} name - generate success message 
     * @returns success or failed messgae
     */
    extractFlashMessage(name){
        let message = this.req.flash(name)
        return message.length>0 ? message[0] : false
    }

     /**
      * 
      * @returns boolean value false or true
      */
    hasMessage(){
        return !this.success && !this.fail ? false :true
    }

    /**
     * 
     * @param {object} req - request for flashMessage
     * @returns return flashmessage object
     */
    static getMessage(req){
        let flash = new Flash(req)

        return{
              success : flash.success,
              fail : flash.fail,
              hasMessage: flash.hasMessage()
        }
    }
}

module.exports=Flash