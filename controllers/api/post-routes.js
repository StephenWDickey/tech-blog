
const sequelize = require('../../config/connection');

const router = require('express').Router();


const { Post, User, Vote, Comment } = require('../../models');


///////////////////////////////////////////////////////


// get all posts (posts/)
router.get('/', (req, res) => {

    // use findAll method (like SELECT * FROM posts)
    Post.findAll({

        // we pass in our post attributes that we defined in Post.js
        // created_at is auto-generated
        // we use sequelize.literal to count votes, return as vote_count
        attributes: ['id', 'post_url', 'title', 'created_at', [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']],

        // we want to include our User table
        // we have it give us the username attribute from the user table
        // include: is like saying JOIN in SQL
        include: [
            // include the Comment model here:
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                // we must attach user model
                // so we can attach username to comments
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => res.json(dbPostData))

        .catch(err => {

            console.log(err);

            res.status(500).json(err);

        });
});


// GET request for single post, based on id
router.get('/:id', (req, res) => {
    // findOne method
    Post.findOne({
        where: {
            id: req.params.id
        },
        // sequelize.literal for vote_count
        attributes: ['id', 'post_url', 'title', 'created_at', [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']],
        // order will allow us to designate how the posts are ordered
        // here we put them in descending order based on creation time
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                // we must attach user model
                // so we can attach username to comments
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


/////////////////////////////////////////////////////////


// POST request for posts/ endpoint
router.post('/', (req, res) => {
    // user create method to create post
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.body.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



////////////////////////////////////////////////////////////



// create a PUT request for the posts/upvote endpoint!
// must put this before /:id because Express will think /upvote is an id
// PUT /api/posts/upvote
router.put('/upvote', (req, res) => {
    // create the vote
    // custom static method created in models/Post.js
    // we pass in req.body and Vote object as arguments
    Post.upvote(req.body, { Vote })
        .then(updatedPostData => res.json(updatedPostData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

// PUT request for posts/:id endpoint
router.put('/:id', (req, res) => {
    // update method for PUT requests
    Post.update(
        {
        title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});





//////////////////////////////////////////////////////////


// DELETE request for posts/:id endpoint
router.delete('/:id', (req, res) => {
    // destroy method for deletion
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

/////////////////////////////////////////////////////////


module.exports = router;