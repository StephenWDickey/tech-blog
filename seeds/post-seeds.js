const { Post } = require('../models');

const postData = [
    {
        title: 'Check out this cool post!',
        
        post_content: 'This is a very interesting post with lots of info.',

        user_id: 1
    },
    {
        title: 'Another interesting post.',

        post_content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        
        user_id: 1
    },
    {
        title: 'An Ode to Coding',

        post_content: 'O how I love to code! The clicking and clacking of the keyboard makes my hear singeth!',

        user_id: 1
    }]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;