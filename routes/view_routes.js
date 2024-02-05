// get mods
const router = require('express').Router();
const { recipeController, dashboardController, searchController, authController } = require('../controllers');

console.log(`\n\n\nrecipe`)
console.log(recipeController)
console.log(`\n\n\nrecipe`)

//show dashboard
router.get('/', dashboardController.showDashBoardPage);

// show recipe page
router.get('/view_recipe/:id', recipeController.buildRecipe);

// show edit recipe page
router.get('/edit_recipe/:editId', recipeController.buildRecipe);

// show search page
router.get('/search', searchController.showSearchPage);

// show search result based on the title
// router.get('/search', async (req, res) =>{
//     try{
//         const searchQuery = req.query.title;
//         const receipes = await Receipe.findAll({
//             where: {
//                 title: {
//                     [Op.like]: `%${searchQuery}%`
//                 }
//             }
//         });
//         if(receipes.length){
//             return res.json({
//                 error: 404,
//                 message: 'No receipe found by that title.'
//             });
//         }
//         res.json(receipes);
//     }catch (err) {
//         console.log(err);
//         res.json({
//             error: 400,
//             message: 'There was an error searching for that book'
//         })
//     }
// })
// show sign up page
router.get('/signup', authController.showSignUpPage);

// show log in page
router.get('/login', authController.showLoginPage);


module.exports = router;