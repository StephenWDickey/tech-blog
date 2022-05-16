const { Comment } = require('../models');

const commentData = [
    {
        comment_text: 'Wow what a cool post!',
        
        user_id: 1,

        post_id: 1
    }]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;