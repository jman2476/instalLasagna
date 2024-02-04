let stepIdQueue = [];

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


function addStep(sequence, newStepId) {

  console.log(newStepId)

  let os = $('#os').text();

  step = `

<div id="${newStepId}" class="step sequence-${sequence} ${os} mb5 mt2 pa3 pt4 flex justify-center items-center tc">

<p class="grow delete-btn" id="delete-step-${newStepId}">Delete Step</p>

<p class="step-sequence grow">Step <span>${sequence}</span>.</p> 

<textarea class="tc step-input-text pa2 input-reset ba bg-transparent " type="text" id="step-${newStepId}" value=""></textarea>


<p class="note edit-note grow" id="edit-note-${newStepId}">Add Note</p>


<input class="note-text white dtc v-mid child bg-black-40 pa1" style="display:none;" id="note-text-${newStepId}" value="">

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

    let content = stepTextarea.val();
    let sequenceClass = $(this).find('p.add-step').attr('id');
    console.log(sequenceClass)
    let sequence = sequenceClass.replace('sequence-', '');

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
    }), // SENDING RECIPE DATA SENDING RECIPE DATA SENDING RECIPE DATA 
    success: function (response) {
      console.log('Success:');
      return response;

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
    // $(this).find('textarea').attr('id', 'step-' + sequenceNumber);

    // Update the edit note id
    // $(this).find('.edit-note').attr('id', 'edit-note-' + sequenceNumber);

    // Update the input id
    // $(this).find('.note-text').attr('id', 'note-text-' + sequenceNumber);

    // Update the sequence text inside p.step-sequence
    $(this).find('p.step-sequence').text('Step ' + sequenceNumber + '.');

    // update delete id
    // $(this).find('.delete-btn').attr('delete-step-' + sequenceNumber );

    sequenceNumber++;
  });
  console.log(`\nupdated sequence\n`)


}


async function getNewStepId(sequence){
  const baseURL = window.location.origin;
  const queryString = window.location.search;
  const urLParams = new URLSearchParams(queryString);

  const recipeId = urLParams.get("recipeId");
  const apiUrl = `${baseURL}/api/recipes/${recipeId}/new_step/${sequence}`
  console.log(apiUrl);


  return new Promise((resolve, reject) => {
    $.ajax({
      url: apiUrl,
      type: 'GET', // GETTING NEW STEP IDGETTING NEW STEP IDGETTING NEW STEP ID
      success: function (response) {
        console.log(response)
        resolve(response)
      },
      error: function (xhr, status, error) {
        console.error('Error:', error);
        reject(error)
      }
    });
  })

}

async function preFetchStepIds(count) {
  for(let i = 0; i < count; i++){
    let newStepId = await getNewStepId(0)
    let id = newStepId.stepId;
    console.log(id)
    stepIdQueue.push(id)
  }
  console.log(stepIdQueue)
}



$(document).ready(async function () {

  await preFetchStepIds(5) // save to local storage
  updateSequence()


  const recipeForm = $('#recipe-form')

  // FOR WHEN VIEWING RECIPES, IT WONT WORK NEED TO UPDATED IT'S ID

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

  $('.step').on('click', '.delete-btn', function () {
      console.log($(this).attr('id'))
    let btnId = $(this).attr('id');
    let stepId = btnId.replace('delete-step-', '#');
    let sequenceClass = $(this).siblings('p.add-step').attr('id');
    console.log(sequenceClass)
    $(stepId).addClass('deleted');
    $(stepId).removeClass(sequenceClass);
    updateSequence()
  })

  recipeForm.on('click', '.add-step', async function () {
    if(stepIdQueue.length === 0) {
      await preFetchStepIds(5)
    }


    let addStepId = $(this).attr('id');
    let sequence = addStepId.replace('sequence-', '')
    sequence++;

    let newStepId = stepIdQueue.shift();



    console.log(sequence, newStepId)
      $(`.${addStepId}`).after(addStep(sequence, newStepId))
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


