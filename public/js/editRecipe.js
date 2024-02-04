// // when page loads js is gonna sniff url
// // /edit_recipe?recipeId=87 --> take id and get steps from api
// // build steps
// // 

// function recipeSteps(){

//     const baseURL = window.location.origin;
//     const queryString = window.location.search;
//     const urLParams = new URLSearchParams(queryString);

//     const recipeId = urLParams.get('recipeId');


//     const apiUrl = baseURL + '/api/recipe_steps/' + recipeId;

//     $.get(apiUrl, function(data) {
//         console.log(data);
//     }).fail(function() {
//         console.log('Cannot access api');
//     })
// }

// $(document).ready(function() {
//     recipeSteps()

// })
