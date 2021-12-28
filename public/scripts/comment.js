let comment = document.getElementById('comment')
let commentHolder = document.getElementById('comment-holder')

/**
 * comment script file
 * take any comment until presseing the enter key
 */
comment.addEventListener('keypress', function (e) {


    if (e.key == 'Enter') { //if event.target==enter key text body stored into a variable data
        if (e.target.value) {

            let data = {
                body: e.target.value
            }

            let postId = comment.dataset.post // destructure postId from dataset post

            /**
             * request for comment to the server
             */
            generateReq('comment', postId, data)
                .then(res => res.json()) // response back json data
                .then(data => {
                    let commentElement = createComment(data) // JSON data passing into html
                    commentHolder.insertBefore(commentElement, commentHolder.children[0]) //insert comment 
                    e.target.value = '' //after posting comment text-field will be blank
                    let nocom = document.getElementById('no-comment') // if no comment
                    nocom.innerHTML = ''
                })
                .catch(e => {
                    console.log(e.response.data) // if server error happended
                    alert(e.response.data.error)
                })

        }
    }


})
/**
 * generate a request for replies and post a replie into comment
 */
commentHolder.addEventListener('keypress', function (e) {

    //replies until pressing enter key
    if (commentHolder.hasChildNodes(e.target)) {
        if (e.key == 'Enter') {
            let commentId = e.target.dataset.comment
            let value = e.target.value

            if (value) {
                let data = {
                    body: value
                }

                

                generateReq('comment/replies', commentId, data)//request to the server for replies
                    .then(res => res.json())// response back json data
                    .then(data => { 

                        let replyElement = createReply(data)//json data transfer to the html
                        let parent = e.target.parentElement
                        parent.previousElementSibling.appendChild(replyElement)//insert replies
                        e.target.value = ''

                    })
                    .catch(e => {
                        console.log(e)
                        alert(e.message)
                    })
            } else {
                alert('please provide a valid reply')
            }
        }
    }
})


/**
 * generate A request object with http fetch api request
 * @param {string} type - take a sub-route as a string 
 * @param {ObjectId} postId - take objectId
 * @param {JSON} body -take comment as a JSON Object 
 * @returns a reuest object with fetch api
 */
function generateReq(type, postId, body) {

    let headers = new Headers()
    headers.append('Accept', 'Application/JSON') //accept JSON file
    headers.append('Content-Type', 'Application/JSON') //content type will be JSON

    let req = new Request(`/api/${type}/${postId}`, {
        method: 'POST', //sending post request
        headers,
        body: JSON.stringify(body), //convert JSON to string
        mode: 'cors'
    })

    return fetch(req)


}

/**
 * Create a new comment
 * @param {string} comment - take comment as a string text
 * @returns comment html body
 */
function createComment(comment) {
    let innerHtml = `     <img src="${comment.user.profilePic}" alt=""
    class="img-fluid img-thumbnail rounded-circle mx-3 mt-2" width="60px">
  <span class="comment-user text-muted mt-2">
    ${comment.user.profile.name} | just now
  </span>
    <div class="media-body">
    <p class="comment-body">${comment.body}</p>
    <div class="my-3">
    <textarea name="reply" id="reply" class="form-control w-50" placeholder="Replies..."data-comment="${comment._id}" cols="30" rows="1"></textarea>
  </div>
  </div>
    `
    let div = document.createElement('div')
    div.className = "media border-bottom"
    div.innerHTML = innerHtml
    return div
}

/**
 * Create a new reply
 * @param {string} reply -take reply as a string text
 * @returns reply html body
 */
function createReply(reply) {
    let innerHTML = `   <img src="${reply.profilePic} " alt="" class="img-fluid img-thumbnail rounded-circle align-self-start mr-3"
    width="60px">
    <span class="reply-user text-muted mt-2">
     ${reply.name}
    </span> 
  <div class="media-body">
    <p class="comment-body">${reply.body}</p>

  </div>`

    let div = document.createElement('div')
    div.className = "media mt-3"
    div.innerHTML = innerHTML
    return div

}