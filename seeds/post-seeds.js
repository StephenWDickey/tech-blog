const { Post } = require('../models');

const postData = [
    {
        title: 'Check out this cool post!',
        
        post_url: 'coolpost.com'
    }]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;