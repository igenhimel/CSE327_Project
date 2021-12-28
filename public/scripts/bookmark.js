

    const bookmarks = document.getElementsByClassName('bookmark')
/**
 * script file for bookmarks any post
 */
    ;[...bookmarks].forEach(bookmark=>{
    
        bookmark.style.cursor='pointer'

        bookmark.addEventListener('click',function(e){
            let target = e.target.parentElement

            let headers = new Headers()
            headers.append('Accept','Application/JSON')

        //request will  send based on it response will be happened with json file
            let req = new Request(`/api/bookmarks/${target.dataset.post}`,{
                method:'GET',
                headers,
                mode:'cors'
            })

            fetch(req)
            .then(res=>res.json())
            .then(data=>{
                if(data.bookmarks){
                    
                   
                    target.innerHTML = '<i class="fas fa-bookmark text-primary"></i>'
                }

                else{
                  
                    target.innerHTML = '<i class="far fa-bookmark"></i>'
                }
            })
            .catch(e=>{
                console.error(e.response.data)
                alert(e.response.data.error)

            })
        })

    })



