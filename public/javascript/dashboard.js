

async function addPostInputHandler(event) {

    event.preventDefault();

    const titleLabel = document.createElement('label');
    const titleInput = document.createElement('input');

    titleLabel.setAttribute('for', 'titleInput');
    titleLabel.innerHTML='Post Title';
    titleLabel.classList.add('text-light', 'fw-bold', 'mx-2');

    titleInput.setAttribute('type', 'text');
    titleInput.classList.add('titleInput', 'text-dark', 'fw-bold');

    postContainer = document.querySelector('.post-container');
    postContainer.classList.add('mt-5', 'p-5', 'bg-dark')

    postContainer.appendChild(titleLabel);
    postContainer.appendChild(titleInput);

    const postContentLabel = document.createElement('label');
    const postInput = document.createElement('input');

    postContentLabel.setAttribute('for', 'postInput');
    postContentLabel.innerHTML='Post Content';
    postContentLabel.classList.add('text-light', 'fw-bold', 'mx-2');

    postInput.setAttribute('type', 'text');
    postInput.classList.add('text-dark', 'fw-bold');

    const createPost = document.createElement('button');
    createPost.innerHTML = "Create New Post!";
    createPost.classList.add('btn', 'btn-success', 'btn-large', 'mx-5');

    postContainer.appendChild(postContentLabel);
    postContainer.appendChild(postInput);

    postContainer.appendChild(createPost);

    

    async function createPostHandler(event) {

        event.preventDefault();
    
        title = titleInput.value.trim();
    
        post_content= postInput.value.trim();
    
    
        if (title && post_content) {
            // we assign await function to a variable, so we do not have to chain .then methods to fetch
            const response = await fetch('http://localhost:3001/api/posts', {
                method: 'post',
                body: JSON.stringify({
                    title,
                    post_content
                    
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            // check the response status
            if (response.ok) {
                
                document.location.replace('/dashboard');
                
            } else {
                alert(response.statusText);
        
            };
        }
    }

    createPost.addEventListener('click', createPostHandler);
}

document.querySelector('.addPost').addEventListener('click', addPostInputHandler);



function openPostOptions(event) {
    
    event.target.innerHTML="";
    event.target.classList.remove('float-end')
    event.target.classList.add('overflow-hidden');

    const commentPost = document.createElement('button');
    commentPost.innerHTML = "Leave a Comment";
    commentPost.classList.add('btn', 'btn-light', 'btn-large', 'mx-5', 'my-2', 'p-3', 'float-end');


    const editPost = document.createElement('button');
    editPost.innerHTML = "Update this Post";
    editPost.classList.add('btn', 'btn-success', 'btn-large', 'mx-5', 'my-2', 'p-3', 'float-end');

    const deletePost = document.createElement('button');
    deletePost.innerHTML = "Delete this Post";
    deletePost.classList.add('btn', 'btn-danger', 'btn-large', 'mx-5', 'my-2', 'p-3', 'float-end');
        
    event.target.appendChild(deletePost);
    event.target.appendChild(editPost);
    event.target.appendChild(commentPost);
    
}



const optionsContainers = document.querySelectorAll('.options-container');
    

for (var i=0; i < optionsContainers.length; i++) {
    
    optionsContainers[i].addEventListener('click', openPostOptions, {once:true});

}
