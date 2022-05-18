const { User } = require('../models');

const userData = [
    {
        username: 'TestTesterson',
        
        password: 'password123'
    },
    {
        username: 'CodyCoder',

        password: 'thisisapassword'
    }]

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;