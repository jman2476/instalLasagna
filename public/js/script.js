// Function to send a GET request to the API
function fetchData() {
  const baseURL = window.location.origin;
  const queryString = window.location.search;
  const urLParams = new URLSearchParams(queryString);

  const recipeId = urLParams.get("recipeId");

  const apiUrl = baseURL + "/api/recipe_steps/" + recipeId;
  console.log(apiUrl);
  $.ajax({
    url: apiUrl, // Replace 'YOUR_API_ENDPOINT' with your actual API URL
    type: "GET",
    success: function (data) {
      console.log(data);
      // Log the received data to the console
      console.log("Um hello?");
    },
    error: function (error) {
      // Log any error to the console
      console.error("Error fetching data:", error);
    },
  });
}




$(document).ready(function () {

  $(".notes-button").on('click', function(){
    let buttonId = $(this).attr('id');

    let sequenceId = buttonId.replace('show-note', '');
    let spanSelector = `#note-text-${sequenceId}`;
  })
  // Optional: Call fetchData on some event, e.g., button click
  $("#fetchDataButton").click(fetchData);

});
