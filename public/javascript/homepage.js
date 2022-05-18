///////////////////////////////////////////////////////////////

function openCommentInputHandler(event) {

    event.preventDefault();


    const optionsContainer = event.target.closest('div');
    optionsContainer.classList.add('bg-dark', 'mb-5')
;


    optionsContainer.classList.add( 'p-5', 'bg-dark', 'mt-5');
    

    const commentLabel = document.createElement('label');
    const commentInput = document.createElement('input');

    commentLabel.setAttribute('for', 'commentInput');
    commentLabel.innerHTML='Type your Comment';
    commentLabel.classList.add('text-light', 'fw-bold', 'mt-3', 'ms-5');


    commentInput.setAttribute('type', 'text');
    commentInput.classList.add('text-dark', 'fw-bold', 'mt-3', 'mx-3');

    const postComment = document.createElement('button');
    postComment.innerHTML = "Post your Comment!";
    postComment.classList.add('btn', 'btn-success', 'btn-large', 'mt-1', 'mx-5');
    
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
                document.location.replace('/');
            }
            else {
                alert(response.statusText);
            }
        }
    }

    postComment.addEventListener('click', postCommentHandler);

}

/////////////////////////////////////////////////////

function openPostOptions(event) {
    
    event.target.innerHTML="";
    event.target.classList.remove('float-end')
    event.target.classList.add('overflow-hidden');

    const commentPost = document.createElement('button');
    commentPost.innerHTML = "Leave a Comment";
    commentPost.classList.add('btn', 'btn-light', 'btn-large', 'mx-5', 'my-2', 'p-3', 'float-end');

        
    
    event.target.appendChild(commentPost);

    commentPost.addEventListener('click', openCommentInputHandler, {once:true});
    
}



const optionsContainers = document.querySelectorAll('.options-container');
    

for (var i=0; i < optionsContainers.length; i++) {
    
    optionsContainers[i].addEventListener('click', openPostOptions, {once:true});

}


//////////////////////////////////////////////////////////////////////////////////////////










async function viewComments(event) {

    event.preventDefault();

    const post = event.target.closest("[data-post-id]");

    const postId = post.getAttribute("data-post-id");

    const commentContainerHeader = document.createElement('h3');

    commentContainerHeader.innerHTML = 'Displaying comments!';

    commentContainerHeader.classList.add("mt-3", 'border-bottom', 'border-dark');

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

                    console.log(commentData[i]);

                    // we obtain the comment itself
                    const postComments = commentData[i].comment_text;
                    
                    const commentUsers = commentData[i].user_id;

                    const commentsContainers = document.createElement('p');

                    commentsContainers.innerHTML = postComments;

                    commentsContainers.classList.add('mt-3');

                    event.target.appendChild(commentsContainers);
                
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

