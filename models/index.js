const Recipe = require('./Recipe.js');
const Step = require('./Step.js')
const ErrorReport = require('./ErrorReport.js')
const ErrorSolution = require('./ErrorSolution.js')
const User = require('./User.js')


// Establish associations
Recipe.belongsTo(User, { foreignKey: 'creatorID' });
User.hasMany(Recipe, { foreignKey: 'creatorID' });

Step.belongsTo(Recipe, { foreignKey: 'recipeId' });
Recipe.hasMany(Step, { foreignKey: 'recipeId' });

// ErrorReport.belongsTo(User, { foreignKey: 'creatorID' });
// ErrorReport.belongsTo(Recipe, { foreignKey: 'recipeId' });
// ErrorReport.belongsTo(Step, { foreignKey: 'stepId', allowNull: true });

// ErrorReport.belongsTo(ErrorSolution, { foreignKey: 'solutionId', allowNull: true });
// ErrorSolution.hasMany(ErrorReport, { foreignKey: 'solutionId' });

module.exports = {Recipe, Step, ErrorReport, ErrorSolution, User}