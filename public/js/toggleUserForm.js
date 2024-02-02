// Using Jquery to toggle showing credential form
$(document).ready(function() {

    $('.signUpToggle').click(function() {
        const btnText = $(this).text();

        $('.credentialSubmit').val(btnText);

        $('.credentials').toggle();
    })
});