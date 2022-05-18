const commentLinks = document.querySelectorAll('.comments-length')



async function viewComments(event) {

    event.preventDefault();

    event.target.closest('.comments-length').classList.remove('bg-success');

    const post = event.target.closest("[data-post-id]");

    const postId = post.getAttribute("data-post-id");

    const commentContainerHeader = document.createElement('p');

    

    event.target.innerHTML = ""

    commentContainerHeader.innerHTML = '--Displaying comments--';

    commentContainerHeader.classList.add("mt-3");

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
                    

                    const commenters = commentData[i].user.username;

                    const commenterContainers = document.createElement('p');

                    commenterContainers.innerHTML = '----' + commenters + '----' + 'created at: ' + createdAtClean;
                    commenterContainers.classList.add('mx-5');

                    const commentsContainers = document.createElement('li');

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

    

for (var i=0; i < commentLinks.length; i++) {
    
    commentLinks[i].addEventListener('click', viewComments, {once:true});

};
