

// import Model class and DataTypes method from sequelize
const { Model, DataTypes } = require('sequelize');


// import connection to db
const sequelize = require('../config/connection');



//////////////////////////////////////////////////////////


// create our Post model
class Post extends Model {

    // static is a javascript keyword
    // we are creating a 'model method'
    // parameters are body and models (which will be req.body)
    // models will be an object of the models
    static createdAt(body, models) {
      
        return Post.findOne({

          where: {
            id: body.post_id
          },
          attributes: [
            'id',
            'post_url',
            'title',
            'created_at'
          ]
        });
      
    }
  }



// create fields/columns for Post model
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            //***here is our PRIMARY KEY
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_content: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
            
        },
        user_id: {

            type: DataTypes.INTEGER,

            //***here is our FOREIGN KEY, it references the user table
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
    
        sequelize,

        freezeTableName: true,
    
        underscored: true,
    
        modelName: 'post'
    }
);


////////////////////////////////////////////////////////////


// export the Post model
module.exports = Post;