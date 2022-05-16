const { User } = require('../models');

const userData = [
    {
        username: 'testuser',
        
        password: 'password123'
    }]

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;