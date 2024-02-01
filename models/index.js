const Recipe = require('./Recipe');
const Step = require('./Step.js')
const ErrorReport = require('./ErrorReport.js')
const ErrorSolution = require('./ErrorSolution.js')
const User = require('./User.js')

Recipe.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Recipe, { foreignKey: 'userId' });

module.exports = {Recipe, Step, ErrorReport, ErrorSolution, User}