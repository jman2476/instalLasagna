console.log(recipeId)

const stepIdManager = {
  stepIdQueue: [],
  unusedStepIdsKey: "unusedStepIds",
  // mthd to fetch step ids preemptively
  async preFetchStepIds(count) {
    for (let i = 0; i < count; i++) {
      let newStepId = await this.getNewStepId();
      let id = newStepId.stepId;
      this.stepIdQueue.push(id);
    }
    console.log(this.stepIdQueue);
  },
  // method to return promiseobj of stepId
  async getNewStepId() {
    const unusedStepIds = JSON.parse(
      localStorage.getItem(this.unusedStepIdsKey) || "[]"
    );
    if (unusedStepIds.length > 0) {
      const id = unusedStepIds.shift();
      localStorage.setItem(
        this.unusedStepIdsKey,
        JSON.stringify(unusedStepIds)
      );
      return { stepId: id };
    }

    const baseURL = window.location.origin;
    const apiUrl = `${baseURL}/api/recipes/new_step`;

    return new Promise((resolve, reject) => {
      $.ajax({
        url: apiUrl,
        type: "GET", // GETTING NEW STEP IDGETTING NEW STEP IDGETTING NEW STEP ID
        success: function (response) {
          console.log(response);
          resolve(response);
        },
        error: function (xhr, status, error) {
          console.error("Error:", error);
          reject(error);
        },
      });
    });
  },
  // mthd to save any unused step ids to local storage
  saveUnusedStepId(unusedStepId) {
    const unusedStepIds = JSON.parse(
      localStorage.getItem(this.unusedStepIdsKey) || "[]"
    );
    unusedStepIds.push(unusedStepId);
    localStorage.setItem(this.unusedStepIdsKey, JSON.stringify(unusedStepIds));
  },
  // mthd to load steps from local storage
  async loadUnusedStepIds() {
    const unusedStepIds = JSON.parse(
      localStorage.getItem(this.unusedStepIdsKey) || "[]"
    );
    console.log("unused ids", unusedStepIds);
    this.stepIdQueue = this.stepIdQueue.concat(unusedStepIds);
    localStorage.setItem(this.unusedStepIdsKey, JSON.stringify([]));
  },
  // mthd to return first id in stepid list
  async getStepIdFromQueue() {
    if (this.stepIdQueue.length === 0) {
      console.warn("Step Id queue is empty, replenishing...");
      await this.preFetchStepIds(5);
    }
    return this.stepIdQueue.shift();
  },
  // mthd to save list of ids to local storage
  saveQueueToLocalStorage() {
    if (this.stepIdQueue.length > 0) {
      const existingStepIds = JSON.parse(
        localStorage.getItem(this.unusedStepIdsKey) || "[]"
      );
      const combinedStepIds = [
        ...new Set([...existingStepIds, ...this.stepIdQueue]),
      ];

      localStorage.setItem(
        this.unusedStepIdsKey,
        JSON.stringify(combinedStepIds)
      );
      console.log("queue saved to local storage");
    }
  },
//   mthd to load/fetch unused step ids
  async init() {
    console.log("Initializing");
    await this.loadUnusedStepIds();
    const currentLength = this.stepIdQueue.length;
    const idsNeeded = 5 - currentLength;
    if (idsNeeded > 0) {
      await this.preFetchStepIds(idsNeeded);
    }
  },
};

const DOMHandler = {
    // mthd to return step html
  addStep(sequence) {

    step = `
      
          <div class="step sequence-${sequence} mb5 mt2 pa3 pt4 flex justify-center items-center tc">
      
            <p class="grow delete-btn" id="delete-step-${sequence}">Delete Step</p>
      
            <p class="step-sequence grow">Step <span>${sequence}</span>.</p> 
      
            <textarea class="tc step-input-text pa2 input-reset ba bg-transparent " type="text" id="step-sequence" value=""></textarea>
      
      
            <p class="note edit-note grow" id="edit-note-${sequence}">Add Note</p>
      
      
            <input class="note-text white dtc v-mid child bg-black-40 pa1" style="display:none;" id="note-text-${sequence}" value="">
      
            <p id="sequence-${sequence}" class="grow add-step inside pointer">V Add Step V</p>
      
      
          </div>
        `;

    return step;
  },
  // mthd to update sequence of steps
  updateSequence() {
    let sequenceNumber = 1;

    $(".step").each(function () {

      // Update the class of the div
      $(this).attr("class", function (index, c) {
        return c.replace(/sequence-\d+/, "sequence-" + sequenceNumber);
      });

      // Update the sequence text inside p.step-sequence
      $(this)
        .find("p.step-sequence")
        .text("Step " + sequenceNumber + ".");
      $(this)
        .find("p.add-step")
        .attr("id", "sequence-" + sequenceNumber);

      sequenceNumber++;

    });
    if ($(".step").length === 1) {
      $(".step .delete-btn").hide();
    } else {
      $(".step .delete-btn").show();
    }
    console.log(`\nupdated sequence\n`);

  },
};

const serverCommunicator = {
    // mthd to send recipe data from user
  sendRecipeData() {
    const baseURL = window.location.origin;

    const apiUrl = `${baseURL}/api/recipe/update`;

    let steps = [];

    $(".step").each(function () {
      let step = $(this);
      // let stepId = $(this).attr("id") || "";

      let content = step.find("textarea.step-input-text").val();

      // let content = stepTextarea.val();
      let sequence = step.find("p.add-step").attr("id").replace("sequence-", "");

      // let sequence = sequenceClass;

      let notes = step.find("input.note-text").val();
      console.log(typeof notes);
      console.log('notes', notes)

      let stepObj = {
        sequence,
        content,
        notes: notes ? notes : null,
        recipeId,
        status: "confirmed",
      };


      steps.push(stepObj);
    });
    console.log(steps);

    $.ajax({
      url: apiUrl,
      type: "PUT",
      contentType: "application/json", // Setting the content type to JSON
      data: JSON.stringify({
        steps: steps,
        recipeId
      }), // PUTING RECIPE DATA PUTING RECIPE DATA PUTING RECIPE DATA
      success: function (response) {
        $('#save-status').text('Save Successful!');

        setTimeout(function() {
          $('#save-status').text('');
        }, 1000);
    
        console.log("Success:");
        return response;
      },
      error: function (xhr, status, error) {
        $('#save-status').text('Save unsuccessful, please try again');

        setTimeout(function() {
          $('#save-status').text('');
        }, 1000);
    

        console.error("Error:", error);
      },
    });
  },
  deleteRecipe(){
    console.log('delete clicked')
    const baseURL = window.location.origin;
    const path = window.location.pathname;
    const segments = path.split("/");

    const recipeId = segments.pop() || segments.pop();
    const apiUrl = `${baseURL}/api/recipes/${recipeId}/delete`;

    $.ajax({
      url: apiUrl,
      type: "DELETE",
      contentType: "application/json", // Setting the content type to JSON
                                        // delete RECIPE DATA delete RECIPE DATA delete RECIPE DATA
      success: function (response) {
        console.log("Success: ", response);
        return response;
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
      },
    });
  }
};

$(document).ready(async function () {

    //init
  // await stepIdManager.init();
  DOMHandler.updateSequence();

  const recipeForm = $("#recipe-form");

    // opens note input
  recipeForm.on("click", ".edit-note", function () {
    let editBtnId = $(this).attr("id");
    let inputId = editBtnId.replace("edit-note-", "");
    let input = `#note-text-${inputId}`;
    $(this).text() === "Add Note" ? $(this).text("Edit Note") : "";
    $(input).toggle();
  });

  // deletes step

  recipeForm.on("click", ".step .delete-btn", function () {
    $(this).parent().remove();
    DOMHandler.updateSequence();
  });

  // adds step to dom
  recipeForm.on("click", ".add-step", async function () {
    let sequenceId = $(this).attr("id");
    let sequence = sequenceId.replace("sequence-", "");

    $(`.${sequenceId}`).after(DOMHandler.addStep(sequence++));
    DOMHandler.updateSequence();
  });

  // Auto adjusts textarea 
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

  $("#save-btn").on("click", function () {
    // stepIdManager.saveQueueToLocalStorage();
    serverCommunicator.sendRecipeData();
  });

  $("#delete-recipe-btn").on("click", function() {
    serverCommunicator.deleteRecipe();
  })
});
// save unused ids to local storage b4 user reloads/moves pages
$(window).on("beforeunload", function () {
  stepIdManager.saveQueueToLocalStorage();
});
