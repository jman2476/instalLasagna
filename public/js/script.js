// // Using Jquery to toggle showing credential form

// function recipeSteps(){

//     const baseURL = window.location.origin;
//     const queryString = window.location.search;
//     const urLParams = new URLSearchParams(queryString);

//     const recipeId = urLParams.get('recipeId');


//     const apiUrl = baseURL + '/api/recipe_steps/' + recipeId;
//     console.log(apiUrl)
//     $.get(apiUrl, function(data) {
//         console.log('data!')
//         console.log(data);
//     }).fail(function() {
//         console.log('Cannot access api');
//     })
// }

// $(document).ready(function() {
//     console.log('document is ready!')

//     recipeSteps()

//     $('.signUpToggle').click(function() {
//         const btnText = $(this).text();

//         // $('.credentialSubmit').val(btnText);

//         $('.credentials').toggle();
//     })
// });


$(document).ready(function() {
    // Function to send a GET request to the API
    function fetchData() {
            const baseURL = window.location.origin;
    const queryString = window.location.search;
    const urLParams = new URLSearchParams(queryString);

    const recipeId = urLParams.get('recipeId');


    const apiUrl = baseURL + '/api/recipe_steps/' + recipeId;
    console.log(apiUrl)
        $.ajax({
            url: apiUrl, // Replace 'YOUR_API_ENDPOINT' with your actual API URL
            type: 'GET',
            success: function(data) {
                console.log(data)
                // Log the received data to the console
                console.log('Um hello?');
            },
            error: function(error) {
                // Log any error to the console
                console.error('Error fetching data:', error);
            }
        });
    }

    // Optional: Call fetchData on some event, e.g., button click
    $('#fetchDataButton').click(fetchData);
});