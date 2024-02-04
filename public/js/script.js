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

  // let os = $('#os').text();

  step = `

<div class="step sequence-${sequence} mb5 mt2 pa3 pt4 flex justify-center items-center tc" id="${newStepId}">

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
      id:stepId,
      sequence,
      content: content ? content : ' ',
      notes: notes ? notes : ' ',
      recipeId:recipeId,
      status:'confirmed'
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

    // Update the sequence text inside p.step-sequence
    $(this).find('p.step-sequence').text('Step ' + sequenceNumber + '.');
    $(this).find('p.add-step').attr('id', 'sequence-' + sequenceNumber);

    sequenceNumber++;
  });
  console.log(`\nupdated sequence\n`)
}


// async function getNewStepId(){

//   const unusedStepIds = JSON.parse(localStorage.getItem('unusedStepIds') || '[]')
//   if(unusedStepIds > 0){
//     return unusedStepIds.shift()
//   }


//   const baseURL = window.location.origin;
//   const queryString = window.location.search;
//   const urLParams = new URLSearchParams(queryString);

//   const recipeId = urLParams.get("recipeId");
//   const apiUrl = `${baseURL}/api/recipes/new_step`
//   console.log(apiUrl);


//   return new Promise((resolve, reject) => {
//     $.ajax({
//       url: apiUrl,
//       type: 'GET', // GETTING NEW STEP IDGETTING NEW STEP IDGETTING NEW STEP ID
//       success: function (response) {
//         console.log(response)
//         resolve(response)
//       },
//       error: function (xhr, status, error) {
//         console.error('Error:', error);
//         reject(error)
//       }
//     });
//   })

// }

// async preFetchStepIds(count) {
//   for(let i = 0; i < count; i++){
//     let newStepId = await this.getNewStepId()
//     let id = newStepId.stepId;
//     console.log(id)
//     stepIdQueue.push(id)
//   }
//   console.log(this.stepIdQueue)
// },



const stepIdManager = {
  stepIdQueue:[],
  unusedStepIdsKey:'unusedStepIds',
  async preFetchStepIds(count) {
    for(let i = 0; i < count; i++){
      let newStepId = await this.getNewStepId()
      let id = newStepId.stepId;
      console.log(id)
      this.stepIdQueue.push(id)
    }
    console.log(this.stepIdQueue)
  },
  async getNewStepId(){ 
    const unusedStepIds = JSON.parse(localStorage.getItem(this.unusedStepIdsKey) || '[]')
    if(unusedStepIds.length > 0){
      const id = unusedStepIds.shift();
      localStorage.setItem(this.unusedStepIdsKey, JSON.stringify(unusedStepIds))
      return { stepId: id };
    }
  
  
    const baseURL = window.location.origin;
    const apiUrl = `${baseURL}/api/recipes/new_step`
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
  
  },
  saveUnusedStepId(unusedStepId) {
    const unusedStepIds = JSON.parse(localStorage.getItem(this.unusedStepIdsKey) || '[]');
    unusedStepIds.push(unusedStepId);
    localStorage.setItem(this.unusedStepIdsKey, JSON.stringify(unusedStepIds));
  },
  async loadUnusedStepIds() {
    const unusedStepIds = JSON.parse(localStorage.getItem(this.unusedStepIdsKey) || '[]');
    console.log('unused ids', unusedStepIds)
    this.stepIdQueue = this.stepIdQueue.concat(unusedStepIds)
    localStorage.setItem(this.unusedStepIdsKey, JSON.stringify([]));
  },
  async getStepIdFromQueue(){
    if(this.stepIdQueue.length === 0){
      console.warn('Step Id queue is empty, replenishing...')
      await this.preFetchStepIds(5)
    }
    return this.stepIdQueue.shift();
  },
  saveQueueToLocalStorage() {
    if(this.stepIdQueue.length > 0) {
      const existingStepIds = JSON.parse(localStorage.getItem(this.unusedStepIdsKey) || '[]');
      const combinedStepIds = [...new Set([...existingStepIds, ...this.stepIdQueue])];

      localStorage.setItem(this.unusedStepIdsKey, JSON.stringify(combinedStepIds));
      console.log('queue saved to local storage')
    }
  },
  async init(){
    console.log('Initializing')
    await this.loadUnusedStepIds();
    const currentLength = this.stepIdQueue.length;
    const idsNeeded = 5 - currentLength;
    if(idsNeeded > 0) {
      await this.preFetchStepIds(idsNeeded)
    }
  }
  
}

// when user presses edit all the steps that are present have a status of 'confirmed'
// 5 blank step ids with sequence of -1, recipeId of -1 and a status of 'temporary'
// user adds in a step and sequence + recipeId are correct, but still holds status of temporary
// if user saves, the step with correct sequence and recipeId's status changes to 'confirmed'
// --^ depreacted



$(document).ready(async function () {
  await stepIdManager.init();
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

  // When user clicks delete button it grabs the id of the button that was clicked(it should be the id of the step)
  // then uses that to get the id of the step div
  // it adds the class of deleted and removes its sequence class, then updates the sequence of the recipe

  recipeForm.on('click', '.step .delete-btn', function () {
    console.log($(this).parent())
      console.log($(this).attr('id'))
      console.log($(this).siblings('p.add-step'))
      console.log($(this).siblings('p.add-step').attr('id'))



    let btnId = $(this).attr('id');
    let stepElement = btnId.replace('delete-step-', '#');
    let sequenceClass = $(this).siblings('p.add-step').attr('id');
    $(stepElement).addClass('deleted');
    $(stepElement).removeClass(sequenceClass);
    $(stepElement).remove()
    updateSequence()
  })

    // When a user adds a step if no id's grab step id's
    // grabs sequence from id of what add step button was pressed
    // adds the step with the sequence + 1, then updates all other steps accordingly

    // maybe we have the user add one, and it updates the sequence sequentially, and on
    // where the new step is supposed to go it gets inserted in 

  recipeForm.on('click', '.add-step', async function () {
    let newStepId = await stepIdManager.getStepIdFromQueue();
    console.log(localStorage);

    let addStepSequence = $(this).attr('id');
    let sequence = addStepSequence.replace('sequence-', '')
    sequence++;


    console.log(sequence, newStepId)
      $(`.${addStepSequence}`).after(addStep(sequence, newStepId))
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
    stepIdManager.saveQueueToLocalStorage();
    sendRecipeData();
  })

 


  


  $("#fetchDataButton").click(fetchData);
});

$(window).on('beforeunload', function() {
  stepIdManager.saveQueueToLocalStorage();
})