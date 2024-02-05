// function to check if there is title text
function checkTitleText() {
    const title = $("#recipeTitle").val()

    if (!title) {
        $('#recipe-error').text(`You need a title for the recipe`)
    }
}


// listener
$("#new-recipe-div>button").click(checkTitleText)