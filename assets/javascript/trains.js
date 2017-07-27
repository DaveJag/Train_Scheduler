/* Dave Jagodowski - HW07 - Train Scheduler */

$(document).ready(function(){

    //Write content to title div
    $("#title").html(
    	"<h1 class='titleClass'>Anytime is Train Time</h1><h2 class='subtitleClass'>Choo Choo. Chee Chee.</h2>"
    );

//Pseudo Code

    // Create a variable to reference the database
    var database = firebase.database();

    //Initial values
    var trainName = "";
    var destination = "";
    var firstTrainTime = ""; //should this be a string or numeric?
    var frequency = "";// in minutes. String or numeric?

//Create an on-click Event Handler for the Submit Button
    $("#addTrainButton").on("click", function () {
    	console.log("onClick event triggered.")
    	// Don't refresh the page (i.e. submit something)
        event.preventDefault();
        //Capture data from all input fields and assign to variables.
        trainName = $("#nameInput").val().trim();
        destination = $("#destinationInput").val().trim();
        firstTrainTime = $("#firstTrainTimeInput").val().trim();
        frequency = $("#frequencyInput").val().trim();
    
  //Provide the initial data to the database.
        database.ref().set({
      	    trainName: trainName,
    	    destination: destination,
    	    firstTrainTime: firstTrainTime,
    	    frequency: frequency
        });
    })   //end on-click event

// At the initial load and on subsequent data value changes, get a snapshot of the current data. (I.E FIREBASE HERE)
// This callback keeps the page updated when a value changes in firebase.
    database.ref().on("value", function(snapshot) {
    // We are now inside our .on function...

    //Console.log everything that is coming out of snapshot (a point-in-time representation of the database)
    // This "snapshot" allows the page to get the most current values in firebase.
      console.log(snapshot.val()); 
      console.log(snapshot.val().trainName);
      console.log(snapshot.val().destination);
      console.log(snapshot.val().firstTrainTime);
      console.log(snapshot.val().frequency);

  // Change the HTML in the table to reflect changes to the database.
  // Append a new row and populate <td> fields. //see recentuser-solved.html, line 139.

  // Convert the the Arrival Time to appropriate format using Moment.js
  // Optional, but have Minutes Away field decrement with each passing minute. 

  // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

   





}); //end document ready