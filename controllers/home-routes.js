const router = require('express').Router();


const sequelize = require('../config/connection');

const { Post, User, Comment} = require('../models');



////////////////////////////////////////////////////////////////////



router.get('/', (req, res) => {


    // we want to retrive all our posts
    // on our homepage
    // we include our comment model and user model

    Post.findAll({
        attributes: [
            'id',
            'post_content',
            'title',
            'created_at'
            
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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

            // pass a single post object into the homepage template

            // with our template engine (handlebars)
            // we can render a template!
            // we are rendering a template called homepage
            // we can find this template in the views folder
            // res.render accepts a second argument
            // it receieves a json object with data to pass to template
            // we take a 'post' object and pass it to
            // homepage.handlebars


            // we must use .get method of sequelize
            // sequelize's get method gives us the data we need from sequelize object


            // we must 'serialize' the array of posts for the template
            const posts = dbPostData.map(post => post.get({ plain: true }));
            
            res.render('homepage', { posts, loggedIn:req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.get('/login', (req, res) => {
    
    
    res.render('login'), {loggedIn: req.session.loggedIn};
});



router.get('/dashboard', (req, res) => {

    

    // we want to retrive all our posts
    // on our homepage
    // we include our comment model and user model

    Post.findAll({
        where: {
            user_id : req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'post_content',
            'created_at'
        ],
        
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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

            

            const posts = dbPostData.map(post => post.get({ plain: true }));
            
            

            res.render('dashboard', {posts, loggedIn:req.session.loggedIn});
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});


/////////////////////////////////////////////////////////


module.exports = router;