const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model { }

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'A user with that username already exists.'
        }
        // ,
        // validate: {
        //     isAlphanumeric: {
        //         args: true,
        //         msg: 'Username must only cotain letters and numbers>'
        //     }
        // }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'A user with that email address already exists'
        },
        validate: {
            isEmail: {
                args: true,
                msg: 'You must provide a valid email address.'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len:{
                args:6,
                msg:'Your password must be at least 6 characters in length.'
            }
        }
    }
},
    {
        sequelize,
        modelName: 'User',
        timestamps: true
    })

module.exports = User;