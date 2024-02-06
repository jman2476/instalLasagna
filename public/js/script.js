$(document).ready(function() {
    // Finds all <h2> elements within .card that contain the text 'Blank Step Holder'
    // Then uses .closest() to find the nearest ancestor with the .card class and hides it
    $(".card h2:contains('Blank Step Holder')").closest('.card').css('display', 'none');
});


console.log('script runnign')
