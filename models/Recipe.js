const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/connections');
const User = require('./User');
class Recipe extends Model{}

Recipe.init({
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:User,
            key:'id'
        }
    }
    },
    {
        sequelize,
        modelName:'Recipe',
        timestamps:true
    }
)


module.exports = Recipe;