const Recipe = require('./Recipe');
const Step = require('./Step.js')
const ErrorReport = require('./ErrorReport.js')
const ErrorSolution = require('./ErrorSolution.js')
const User = require('./User.js')


// Establish associations
Recipe.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Recipe, { foreignKey: 'userId' });

Step.belongsTo(Recipe, { foreignKey: 'recipeId' });
Recipe.hasMany(Step, { foreignKey: 'recipeId' });

ErrorReport.belongsTo(User, { foreignKey: 'userId' });
ErrorReport.belongsTo(Recipe, { foreignKey: 'recipeId' });
ErrorReport.belongsTo(Step, { foreignKey: 'stepId', allowNull: true });

ErrorReport.belongsTo(ErrorSolution, { foreignKey: 'solutionId', allowNull: true });
ErrorSolution.hasMany(ErrorReport, { foreignKey: 'solutionId' });

module.exports = {Recipe, Step, ErrorReport, ErrorSolution, User}