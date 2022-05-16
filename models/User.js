
// import Model class, DataTypes object from Sequelize module
const { Model, DataTypes } = require('sequelize');

// we require our connection to our db
const sequelize = require('../config/connection');


// import bcrypt so we can hash our plaintext passwords!
// bcrypt has a hash method we can use, .hash
const bcrypt = require('bcrypt');

// create our User model
// extends from sequelize model class
class User extends Model {

    // we are creating an instance method, to use on each instance of User
    checkPassword(loginPw) {
        // we use bcrypt's compare() method, and we are using 
        // the synchronous version even though async is typically
        // better for servers
        // we pass in the plaintext password and the hashed password
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// define table columns and configuration
// initializes mode's data/configuration
// two arguments: first argument defines columns and datatypes
// second argument configures options for the table
User.init(
    
    // first argument

    {

    // define an id column
    id: {
        // use the special Sequelize DataTypes object provide 
        // what type of data it is, INTEGER***
        type: DataTypes.INTEGER,
        // this is the equivalent of SQL's `NOT NULL` option
        allowNull: false,
        // instruct that this is the Primary Key****
        primaryKey: true,
        // turn on auto increment
        autoIncrement: true
    },
    // define a username column
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // define a password column
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        // this means the password must be at least four characters long
        len: [4]
        }
    }

    },


    ////////////////////////////////////////////////////////////

    // second argument

    {
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
        hooks: {
            
            /*
            // beforeCreate() is one of Sequelize's hooks, we want to hash 
            // our plaintext password before our User model is created
            beforeCreate(userData) {
                // we use bcrypt and it's hash method, pass in plaintext password
                // we set our saltRound value to 10
                // now we use .then method and create callback function to 
                // return the new data
                return bcrypt.hash(userData.password, 10).then(newUserData => {
                    return newUserData
                });
            }
            */

            // we can clean up the above expressions by using ***async/await syntax
            // async prefixes the function that containts the async function
            async beforeCreate(newUserData) {

                // await prefixes the asynchronous function (.hash)
                // value of response is assigned to password property of newUserData 
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                
                // we return newUserData
                return newUserData;
            },

            // we must hash the password in the PUT request as well
            // use beforeUpdate() hook from Sequelize
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }

        },
    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'user'
    }
);


////////////////////////////////////////////////////////


// we must export our User model
module.exports = User;