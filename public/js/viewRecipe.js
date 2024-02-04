console.log('view Recipe!')

$(document).ready(function() {
    $(".notes-button").on("click", function () {
        console.log('clicked')
        let buttonId = $(this).attr("id");
        console.log(buttonId);
    
        let sequenceId = buttonId.replace("show-note-", "");
        console.log(sequenceId);
        let noteTextId = `#note-text-${sequenceId}`;
        console.log(noteTextId);
    
        $(noteTextId).toggle();
      });
    
})