const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');
const Recipe = require('./Recipe.js');

class ErrorSolution extends Model{}

ErrorSolution.init({
    content: {
        type: DataTypes.TEXT,
        allowNull:true
    },
    recipeId:{
        type:DataTypes.INTEGER,
        allowNull:true,
        references: {
            model: Recipe,
            key: 'id'
        }
    }
    },{
        sequelize,
        modelName: 'ErrorSolution',
        timestamps:true
    }
    )

module.exports = ErrorSolution;