function openPostOptions(event) {
    
    event.target.innerHTML="";
    event.target.classList.remove('float-end')
    event.target.classList.add('overflow-hidden');

    const commentPost = document.createElement('button');
    commentPost.innerHTML = "Leave a Comment";
    commentPost.classList.add('btn', 'btn-light', 'btn-large', 'mx-5', 'my-2', 'p-3', 'float-end');

        
    
    event.target.appendChild(commentPost);
    
}



const optionsContainers = document.querySelectorAll('.options-container');
    

for (var i=0; i < optionsContainers.length; i++) {
    
    optionsContainers[i].addEventListener('click', openPostOptions, {once:true});

}
