const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');
const Recipe = require('./Recipe');
class Step extends Model{}

Step.init({
    sequence:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    content:{
        type: DataTypes.TEXT,
        allowNull:false
    },

    notes: {
        type: DataTypes.TEXT,
        allowNull:true
    },
    recipeId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: Recipe,
            key:'id'
        }
    },
    status: {
        type: DataTypes.ENUM('temporary', 'confirmed'),
        defaultValue: 'temporary',
        allowNull:false
    }
    }, {
        sequelize,
        modelName:'Step',
        timestamps:true
    });

module.exports = Step;