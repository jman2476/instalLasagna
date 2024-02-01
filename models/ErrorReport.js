const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/connections');
const Recipe = require('./Recipe');
const Step = require('./Step.js')
const User = require('./User.js')

class ErrorReport extends Model{}

ErrorReport.init({
    description:{
        type: DataTypes.TEXT,
        allowNull:false
    },
    userId: {
        type:DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:User,
            key:'id'
        }
    },
    recipeId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Recipe,
            key:'id'
        }
    },
    stepId: {
        type: DataTypes.INTEGER,
        allowNull:true,
        references: {
            model:Step,
            key:'id'
        }
    }
    },{
        sequelize,
        modelName:'ErrorReport',
        timestamps:true
    })

module.exports = ErrorReport;