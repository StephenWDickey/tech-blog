const { Post } = require('../models');

const postData = [
    {
        title: 'Check out this cool post!',
        
        post_content: 'This is a very interesting post with lots of info.',

        user_id: 1
    }]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;