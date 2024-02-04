// Function to send a GET request to the API
function fetchData() {
  const baseURL = window.location.origin;
  const queryString = window.location.search;
  const urLParams = new URLSearchParams(queryString);

  const recipeId = urLParams.get("recipeId");

  const apiUrl = baseURL + "/api/recipes/" + recipeId;
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


function addStep() {
  let lastSequenceId =  $('#recipe-form div:last-child').attr('id');
  let lastSequence = lastSequenceId.replace('sequence-', '')
  lastSequence++;
  let os = $('#os').text();

  step = `

<div class="step ${os} mb4 mt2 pa3 pt4 flex justify-center items-center tc" id="">

<p class="step-sequence grow">Step ${lastSequence}.</p> 

<textarea class="tc step-input-text pa2 input-reset ba bg-transparent " type="text" name="step-${lastSequence}"  id="step-${lastSequence}" value=""></textarea>


<p class="note edit-note grow" id="edit-note-${lastSequence}">Add Note</p>


<input class="note-text white dtc v-mid child bg-black-40 pa1" style="display:none;" id="note-text-${lastSequence}" value="">


</div>
  `

  return step
}

function sendRecipeData() {
  const baseURL = window.location.origin;
  const queryString = window.location.search;
  const urLParams = new URLSearchParams(queryString);

  const recipeId = urLParams.get("recipeId");
  const apiUrl = `${baseURL}/api/recipes/${recipeId}/update`

  let steps = []

  $('.step').each(function() {
    let step = $(this);
    let stepId = $(this).attr("id") || '';


    let stepTextarea = step.find('textarea.step-input-text');
    let stepTextareaId = stepTextarea.attr("id");

    let content = stepTextarea.val();
    let sequence = stepTextareaId.replace('step-', '');

    let notes = step.find('input.note-text').val();

    steps.push({
      id:stepId,
      sequence,
      content,
      notes
    })

  })
  console.log(steps);

  $.ajax({
    url: apiUrl,
    type: 'POST',
    contentType: 'application/json', // Setting the content type to JSON
    data: JSON.stringify({
        steps:steps
    }),
    success: function(response) {
        console.log('Success:', response);
    },
    error: function(xhr, status, error) {
        console.error('Error:', error);
    }
});
}

// function getFormData

$(document).ready(function () {

  $(".notes-button").on("click", function () {
    let buttonId = $(this).attr("id");
    console.log(buttonId);

    let sequenceId = buttonId.replace("show-note-", "");
    console.log(sequenceId);
    let noteTextId = `#note-text-${sequenceId}`;
    console.log(noteTextId);

    $(noteTextId).toggle();
  });

  $('#recipe-form').on('click', '.edit-note', function(){
    let editBtnId = $(this).attr('id');
    let inputId = editBtnId.replace('edit-note-', '')
    let input = `#note-text-${inputId}`;
    $(this).text() === 'Add Note' ? $(this).text('Edit Note') : '';
    $(input).toggle();
  })

  $("#add-step").on('click', function(){
    console.log(addStep())
    const form = $('#recipe-form');
    form.append(addStep())
    
  })

  $(".step-input-text")
    .each(function () {
      this.setAttribute(
        "style",
        "height:" + this.scrollHeight + "px;overflow-y:hidden;"
      );
    })
    .on("input", function () {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    });

    $('#save-btn').on('click', function(){
      // console.log('uwbf')
      sendRecipeData();
    })


  $("#fetchDataButton").click(fetchData);
});


