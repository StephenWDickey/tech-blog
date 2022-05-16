// this file will serve as a culmination of all our models we create
// they will be exported for use

const User = require('./User');

const Post = require('./Post');

const Vote = require('./Vote');

const Comment = require('./Comment');


////////////////////////////////////////


// create associations

// the User can make many Posts, we use hasMany method
User.hasMany(Post, {
    // we reference our foreign key designation
    foreignKey: 'user_id'
});


// each Post can only have one User, we must define this reverse relationship
// we use belongsTo method
Post.belongsTo(User, {
    // we must reference our foreign key again
    foreignKey: 'user_id',
    onDelete: "cascade"
});


/////////////////////////////////////////////


// we allow User to model to query Post model via the vote
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

// we allow Post model to query User model via vote 
Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});


// establish relation between Vote and User
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

// establish relation between Vote and Post
Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

// One to many for User and Vote
User.hasMany(Vote, {
    foreignKey: 'user_id'
});

// One to many for Post and Vote
Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

/////////////////////////////////////////////

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});


//////////////////////////////////////////


// export our models!
module.exports = { User, Post, Vote, Comment };