const { Comment } = require('../models');

const commentData = [
    {
        comment_text: 'Wow what a cool post!',
        
        user_id: 1,

        post_id: 1
    },
    {
        comment_text: "Couldn't have said it better myself.",

        user_id: 2,

        post_id: 2
    },
    {
        comment_text: "Looks like we have a poet over here",

        user_id: 2,

        post_id: 3
    },
    {
        comment_text: "Hey I think it's nice",

        user_id: 1,

        post_id: 3
    }]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;