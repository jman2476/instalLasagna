const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/connections');

class ErrorReport extends Model{}

ErrorReport.init({
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
})

module.exports = ErrorReport;