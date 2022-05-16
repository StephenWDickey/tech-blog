const { Vote } = require('../models');

const voteData = [
    {
        user_id: 1,

        post_id: 1
    }]

const seedVotes = () => Vote.bulkCreate(voteData);

module.exports = seedVotes;