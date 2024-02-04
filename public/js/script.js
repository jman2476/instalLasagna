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


function addStep(sequence) {

  let os = $('#os').text();

  step = `

<div class="step sequence-${sequence} ${os} mb5 mt2 pa3 pt4 flex justify-center items-center tc">

<p class="grow delete-btn" id="delete-step-${sequence}">Delete Step</p>

<p class="step-sequence grow">Step <span>${sequence}</span>.</p> 

<textarea class="tc step-input-text pa2 input-reset ba bg-transparent " type="text" name="step-${sequence}"  id="step-${sequence}" value=""></textarea>


<p class="note edit-note grow" id="edit-note-${sequence}">Add Note</p>


<input class="note-text white dtc v-mid child bg-black-40 pa1" style="display:none;" id="note-text-${sequence}" value="">

<p id="sequence-${sequence}" class="grow add-step pointer">
Add Step
</p>


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

  $('.step:not(.deleted').each(function () {
    let step = $(this);
    let stepId = $(this).attr("id") || '';


    let stepTextarea = step.find('textarea.step-input-text');
    let stepTextareaId = stepTextarea.attr("id");

    let content = stepTextarea.val();
    let sequence = stepTextareaId.replace('step-', '');

    let notes = step.find('input.note-text').val();

    let stepObj = {
      sequence,
      content: content ? content : ' ',
      notes: notes ? notes : ' '
    }

    if(stepId){
      stepObj.id = stepId;
    }

    steps.push(stepObj)

  })
  console.log(steps);

  $.ajax({
    url: apiUrl,
    type: 'POST',
    contentType: 'application/json', // Setting the content type to JSON
    data: JSON.stringify({
      steps: steps
    }),
    success: function (response) {
      console.log('Success:');
    },
    error: function (xhr, status, error) {
      console.error('Error:', error);
    }
  });
}
function updateSequence() {
  let sequenceNumber = 1;
  $('.step:not(.deleted)').each(function() {
       // Update the class of the div
       $(this).attr('class', function(index, c) {
        return c.replace(/sequence-\d+/, 'sequence-' + sequenceNumber);
    });

    // Update the textarea id
    $(this).find('textarea').attr('id', 'step-' + sequenceNumber);

    // Update the edit note id
    $(this).find('.edit-note').attr('id', 'edit-note-' + sequenceNumber);

    // Update the input id
    $(this).find('.note-text').attr('id', 'note-text-' + sequenceNumber);

    // Update the sequence text inside p.step-sequence
    $(this).find('p.step-sequence').text('Step ' + sequenceNumber + '.');

    sequenceNumber++;
  });
}

$(document).ready(function () {

  const recipeForm = $('#recipe-form')

  $(".notes-button").on("click", function () {
    let buttonId = $(this).attr("id");
    console.log(buttonId);

    let sequenceId = buttonId.replace("show-note-", "");
    console.log(sequenceId);
    let noteTextId = `#note-text-${sequenceId}`;
    console.log(noteTextId);

    $(noteTextId).toggle();
  });

  recipeForm.on('click', '.edit-note', function () {
    let editBtnId = $(this).attr('id');
    let inputId = editBtnId.replace('edit-note-', '')
    let input = `#note-text-${inputId}`;
    $(this).text() === 'Add Note' ? $(this).text('Edit Note') : '';
    $(input).toggle();
  })

  recipeForm.on('click', '.delete-btn', function () {

    let btnId = $(this).attr('id');
    let stepClass = btnId.replace('delete-step-', '.sequence-');
    console.log(stepClass)
    $(stepClass).addClass('deleted');
    updateSequence()
  })

  recipeForm.on('click', '.add-step', function () {

    let addStepId = $(this).attr('id');
    let sequence = addStepId.replace('sequence-', '')
    sequence++;
    $(`.${addStepId}`).after(addStep(sequence))
    updateSequence()
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

  $('#save-btn').on('click', function () {
    sendRecipeData();
  })

  


  $("#fetchDataButton").click(fetchData);
});


