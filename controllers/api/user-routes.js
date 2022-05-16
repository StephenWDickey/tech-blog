
const router = require('express').Router();

const { User, Post, Vote } = require('../../models');


//////////////////////////////////////////////////////////////


// GET request for / endpoint
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    // findAll is a method from the Model class of Sequelize
    // it's like saying SELECT * FROM users
    User.findAll({
        // we pass this into findAll() method
        // we don't return password info for security
        attributes: { exclude: ['password']}
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {

            console.log(err);

            res.status(500).json(err);

        });

});

// GET request for /:id endpoint
router.get('/:id', (req, res) => {
    // the findOne method gets one piece of data, it is a method
    // imported from Sequelize for the model class
    // we pass in an object as the argument
    // the where option is like saying SELECT * FROM users WHERE id = ?
    User.findOne({

        // we have two objects being passed in as arguments in findOne()
        // again, we want to protect password information
        attributes: {exclude: ['password']},

        // we are going to include info from the post model
        include:[
            {
                model: Post,
                attributes: ['id', 'title', 'post_url', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                // we must attach user model
                // so we can attach username to comments
                include: {
                    model: Post,
                    attributes: ['title']
                }
            },
            {
                // now we are going to see the posts that have been voted on
                model: Post,
                attributes: ['title'],
                through: Vote,
                as: 'voted_posts'
            }
        ],

        // now we want to find the one data point that has this value
        where: {
            // we are focusing on id 
            id: req.params.id
        }
    })
        // if id is not attached to a user, we send 404
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


////////////////////////////////////////////////////////////////////////


// POST request for / endpoint
router.post('/', (req, res) => {
    
    // create method is from sequelize's model class
    // we can pass in key/value pairs where the keys are those defined
    // in our User model
    // this is like writing INSERT INTO users (username, email, password)
    //                      VALUES ("user", "email", "password");
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    // we update .then callback with session info
    // req.session.save() initiates creation of session
    // then runs callback
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;
    
                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});


// create POST request for /login endpoint
router.post('/login', (req, res) => {
    // we find a matching email
    User.findOne({

        where: {

            email: req.body.email
        }
    })
        // we take data from findOne() Sequelize method   
        .then(dbUserData => {
            // if there is no matching email we send 400, bad request
            if (!dbUserData) {

                res.status(400).json({ message: 'No user with that email address!' });
                
                return;

            }

            // Verify user
            // we call our checkPassword instance method we created
            // in User.js, we pass in user's password (it is plaintext)
            // it will compare the plaintext password to the hashed instance
            const validPassword = dbUserData.checkPassword(req.body.password);

            // the compare() method from bsync will return a boolean value
            // if the value is not true
            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password.' });
                return;
            }

            req.session.save(() => {
                //declare session variables
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;
                
                // if the value is true, we send userData
                res.json({ user: dbUserData, message: "You are logged in." });
            });

            


    });

});



router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {

        // destroy method clears session
        req.session.destroy(() => {
            // 204 status code for destroyed session
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

/////////////////////////////////////////////////////////////////////////

// *** remember an HTTP 500 error is different from 404
// *** 404 error means server has not found anything
// *** 400 error is a bad request, usually client side


// PUT request (update request) for user based on id
// remember this involves manipulating req.body as well as req.params
router.put('/:id', (req, res) => {

    // if req.body has exact key/value pairs to match the model, 
    // you can just use `req.body` instead
    // update method is from Sequelize's model class
    // we pass in req.body as 1st argument, then req.params.id as next
    // this is like SQL syntax of: UPDATE users
    //                             SET username = "user", email = "email", password = "password"
    //                             WHERE id = ?;
    User.update(req.body, {

        // because we used beforeUpdate() hook in User model
        // we must make individualHooks = true
        individualHooks: true,
        // we pass in object as argument, define id value as req.params.id
        where: {
            id: req.params.id
        }

    })
        .then(dbUserData => {

            // if no data is returned in our array, send 404
            if (!dbUserData[0]) {

                res.status(404).json({ message: 'No user found with this id' });
                
                return;
            }

            // send data as json
            res.json(dbUserData);
        })

            // if there's an error we will respond with 500 status
            .catch(err => {

                console.log(err);

                res.status(500).json(err);

            });
        
});


///////////////////////////////////////////////


// DELETE request for user based on id
router.delete('/:id', (req, res) => {

    // we use destroy method from Sequelize's model class
    // pass in object as argument, specify id as req.params.id
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            // if there is no data, send 404 status
            if (!dbUserData) {

                res.status(404).json({ message: 'No user found with this id' });
                
                return;
            }
            // send data as json
            res.json(dbUserData);
        })
        // if there's an error respond with 500 status
        .catch(err => {
            
            console.log(err);
            
            res.status(500).json(err);
        });
});


/////////////////////////////////////////////////////


module.exports = router;