//scripts to follow a user

document.querySelectorAll(".usr-follow").forEach(button =>{
    button.addEventListener('click', event => {
        if(event.target.classList.contains('follow')){
            event.target.innerText = 'Unfollow';
            event.target.classList.remove('follow');
        } else{
            event.target.innerText = 'Follow';
            event.target.classList.add('follow')
        }
    })
})