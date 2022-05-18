

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

/////////////////////////////////////////////////////////////////


async function deletePostHandler(event) {
    
    event.preventDefault();


    const post = event.target.closest("[data-post-id]");

    const postId = post.getAttribute("data-post-id");

    console.log(postId);

    const deleteUrl = "http://localhost:3001/api/posts/" + `${postId}`;

    console.log(deleteUrl)

    const response = await fetch ( deleteUrl , {
        method: 'delete',
        headers: { 'Content-Type': 'application/json'}
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    }
    else {
        alert(response.statusText);
    }
}

//////////////////////////////////////////////////

function editPostInputHandler(event) {

    event.preventDefault();

    const titleLabel = document.createElement('label');
    const titleInput = document.createElement('input');

    titleLabel.setAttribute('for', 'titleInput');
    titleLabel.innerHTML='Post Title';
    titleLabel.classList.add('text-light', 'fw-bold', 'mt-3');

    titleInput.setAttribute('type', 'text');
    titleInput.classList.add('titleInput', 'text-dark', 'fw-bold', 'mt-3', 'mx-3');

    const optionsContainer = event.target.closest('div');
    optionsContainer.classList.add('bg-dark', 'mb-5')


    const editContainer = optionsContainer.closest('.edit-container');


    editContainer.classList.add( 'p-5', 'bg-dark', 'mt-5');
    

    const postContentLabel = document.createElement('label');
    const postInput = document.createElement('input');

    postContentLabel.setAttribute('for', 'postInput');
    postContentLabel.innerHTML='Post Content';
    postContentLabel.classList.add('text-light', 'fw-bold', 'mt-3', 'ms-5');


    postInput.setAttribute('type', 'text');
    postInput.classList.add('text-dark', 'fw-bold', 'mt-3', 'mx-3');

    const editPost = document.createElement('button');
    editPost.innerHTML = "Edit This Post!";
    editPost.classList.add('btn', 'btn-primary', 'btn-large', 'mt-1', 'mx-5');
    
    editContainer.appendChild(titleLabel);
    editContainer.appendChild(titleInput);
    editContainer.appendChild(postContentLabel);
    editContainer.appendChild(postInput);
    editContainer.appendChild(editPost);

    async function editPostHandler(event) {
    
        event.preventDefault();
    
        const post = event.target.closest("[data-post-id]");
    
        const postId = post.getAttribute("data-post-id");
    
        console.log(postId);
    
        const editUrl = "http://localhost:3001/api/posts/" + `${postId}`;
    
        title = titleInput.value.trim();

        post_content = postInput.value.trim();

        if( title && post_content ) {
            const response = await fetch ( editUrl , {
                method: 'put',
                body: JSON.stringify({
                    title,
                    post_content
                        
                }),
                headers: { 'Content-Type': 'application/json'}
            });
            if (response.ok) {
                document.location.replace('/dashboard');
            }
            else {
                alert(response.statusText);
            }
        }
    }

    editPost.addEventListener('click', editPostHandler);

}

////////////////////////////////////////////////////////////////////

function openCommentInputHandler(event) {

    event.preventDefault();


    const optionsContainer = event.target.closest('div');
    optionsContainer.classList.add('bg-dark', 'mb-5');


    optionsContainer.classList.add( 'p-5', 'bg-dark', 'mt-5');
    

    const commentBtn = document.querySelector('.commentBtn');
    commentBtn.style.display= 'none';

    const commentLabel = document.createElement('label');
    const commentInput = document.createElement('input');

    commentLabel.setAttribute('for', 'commentInput');
    commentLabel.innerHTML='Type your Comment';
    commentLabel.classList.add('text-light', 'fw-bold', 'mt-3', 'ms-5');


    commentInput.setAttribute('type', 'text');
    commentInput.classList.add('text-dark', 'fw-bold', 'mt-3', 'mx-3');

    const postComment = document.createElement('button');
    postComment.innerHTML = "Post your Comment!";
    postComment.classList.add('btn', 'btn-light', 'btn-large', 'mt-1', 'mx-5');
    
    optionsContainer.appendChild(commentLabel);
    optionsContainer.appendChild(commentInput);
    
    optionsContainer.appendChild(postComment);

    async function postCommentHandler(event) {
    
        event.preventDefault();
    
        const post = optionsContainer.closest("[data-post-id]");

        const post_id = post.getAttribute("data-post-id");

        console.log(post_id)

        comment_text = commentInput.value.trim();

        if( comment_text ) {
            const response = await fetch ( "http://localhost:3001/api/comments/" , {
                method: 'post',
                body: JSON.stringify({
                    comment_text,
                    post_id
                        
                }),
                headers: { 'Content-Type': 'application/json'}
            });
            if (response.ok) {
                document.location.replace('/dashboard');
            }
            else {
                alert(response.statusText);
            }
        }
    }

    postComment.addEventListener('click', postCommentHandler);

}

/////////////////////////////////////////////

function openPostOptions(event) {
    
    event.target.innerHTML="";
    event.target.classList.remove('float-end')
    event.target.classList.add('overflow-hidden');

    const commentPost = document.createElement('button');
    commentPost.innerHTML = "Leave a Comment";
    commentPost.classList.add('commentBtn', 'btn', 'btn-light', 'btn-large', 'mx-5', 'my-2', 'p-3', 'float-end');


    const editPost = document.createElement('button');
    editPost.innerHTML = "Update this Post";
    editPost.classList.add('btn', 'btn-success', 'btn-large', 'mx-5', 'my-2', 'p-3', 'float-end');

    const deletePost = document.createElement('button');
    deletePost.innerHTML = "Delete this Post";
    deletePost.classList.add('btn', 'btn-danger', 'btn-large', 'mx-5', 'my-2', 'p-3', 'float-end');
        
    event.target.appendChild(deletePost);
    event.target.appendChild(editPost);
    event.target.appendChild(commentPost);


    editPost.addEventListener('click', editPostInputHandler, {once:true});
    deletePost.addEventListener('click', deletePostHandler);
    commentPost.addEventListener('click', openCommentInputHandler, {once:true});
}



const optionsContainers = document.querySelectorAll('.options-container');
    

for (var i=0; i < optionsContainers.length; i++) {
    
    optionsContainers[i].addEventListener('click', openPostOptions, {once:true});

}




////////////////////////////////////////////////////////////////

async function viewComments(event) {

    event.preventDefault();

    event.target.closest('.comments-length').classList.remove('bg-success');

    const post = event.target.closest("[data-post-id]");

    const postId = post.getAttribute("data-post-id");

    const commentContainerHeader = document.createElement('p');


    event.target.innerHTML = ""

    commentContainerHeader.innerHTML = '--Displaying comments--';

    commentContainerHeader.classList.add("mt-3", "border-bottom", "border-dark");

    event.target.appendChild(commentContainerHeader);

    const response = await fetch ( "http://localhost:3001/api/comments" , {
        method: 'get',
        headers: { 'Content-Type': 'application/json'}
    });

    if (response.ok) {

        // response returns promise, we must chain .then method
        response.json().then(commentData => {
            // we get an array of comments, we must create for loop
            for (var i=0; i < commentData.length; i++) {
                // we only want comments that are linked to the post
                if (commentData[i].post_id == postId) {

                    const createdAt = commentData[i].createdAt;

                    const createdAtClean = new Date(createdAt);

                    // we obtain the comment itself
                    const postComments = commentData[i].comment_text;
                    
                    console.log (commentData[i].user.username)

                    const commenters = commentData[i].user.username;

                    const commenterContainers = document.createElement('p');

                    commenterContainers.innerHTML = '----' + commenters + '----' + 'created at: ' + createdAtClean;
                    commenterContainers.classList.add('mx-5');

                    const commentsContainers = document.createElement('p');

                    commentsContainers.innerHTML = postComments;

                    event.target.appendChild(commentsContainers);
                    event.target.appendChild(commenterContainers);
                    
                
                }
            }
        })
    }

    else {

        alert(response.statusText);

    }
}



const commentLinks = document.querySelectorAll('.comments-length')

    

for (var i=0; i < commentLinks.length; i++) {
    
    commentLinks[i].addEventListener('click', viewComments, {once:true});

};
