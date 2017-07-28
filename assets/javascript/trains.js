/* Dave Jagodowski - HW07 - Train Scheduler */

$(document).ready(function(){

  // Initialize Firebase
  var config = {
  apiKey: "AIzaSyCQpZaawv7YnkYslDCY5m-oqhslS5VVqFU",
  authDomain: "train-scheduler-59f49.firebaseapp.com",
  databaseURL: "https://train-scheduler-59f49.firebaseio.com",
  projectId: "train-scheduler-59f49",
  storageBucket: "",
  messagingSenderId: "711279604077"
  };
  firebase.initializeApp(config);

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
    var nextArrival = "";
    var frequency = "";// in minutes. String or numeric?
    var minutesAway = "";
    var firstTimeConverted = "";
    var currentTime = "";
    var diffTime = "";
    var minutesUntilTrain = "";
    var nextTrain = "";
    var nextTrainDisplay = "";


//Add a train when the Submit Button is clicked
    $("#addTrainButton").on("click", function () {
    	console.log("onClick event triggered.")
    	// Don't refresh the page or try to submit something.
        event.preventDefault();
        //Capture data from all input fields and assign to variables.
        trainName = $("#nameInput").val().trim();
        destination = $("#destinationInput").val().trim();
        firstTrainTime = $("#firstTrainTimeInput").val().trim();
        frequency = $("#frequencyInput").val().trim();
        //Uses moment.js to convert input times, calculate next Train
        firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
        currentTime = moment();
        diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        remainder = diffTime % frequency;
        minutesUntilTrain = frequency - remainder;
        nextTrain = moment().add(minutesUntilTrain, "minutes");
        nextTrainDisplay = moment(nextTrain).format("hh:mm");

        //Provide the initial data to the database.
        database.ref().push({     //Note .set overwrites the top level of the database.
          //Use database.ref().push to append to the database. Pushing creates "children" in the db.
      	  trainName: trainName,
    	    destination: destination,
    	    firstTrainTime: firstTrainTime,
          frequency: frequency,
          nextTrainDisplay: nextTrainDisplay,
          minutesUntilTrain: minutesUntilTrain
        }); //end database push

        //Clear input fields after getting data.
        $("#nameInput").val("");
        $("#destinationInput").val("");
        $("#firstTrainTimeInput").val("");
        $("#frequencyInput").val("");
    });   //end on-click event

// At the initial load and on subsequent data value changes, get a snapshot of the current data. (I.E FIREBASE HERE)
// This callback keeps the page updated when a value changes in firebase.
//    database.ref().on("value", function(childSnapshot) {
    database.ref().on("child_added", function(childSnapshot) {

    // We are now inside our .on function...

    //Console.log everything that is coming out of snapshot (a point-in-time representation of the database)
    // This "snapshot" allows the page to get the most current values in firebase.
      //console.log(childSnapshot.val()); 
      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().firstTrainTime);
      console.log(childSnapshot.val().frequency);
      console.log(childSnapshot.val().nextTrainDisplay);
      console.log(childSnapshot.val().minutesUntilTrain);
      

    // Change the HTML in the table to reflect changes to the database.
/*    
      $("#trainNameData").html(childSnapshot.val().trainName);
      $("#destinationData").html(childSnapshot.val().destination);
      $("#arrivalData").html(childSnapshot.val().arrival);
      $("#frequencyData").html(childSnapshot.val().frequency);
      //$("#minAwayData").html(childSnapshot.val().frequency);
*/
  // Write data to fields, write fields to row, and add row to table. 
  // Append a new row and populate <td> fields. //see recentuser-solved.html, line 139.
     $("#trainScheduleTableId").append(
      "<tr class ='tableRow' id = " + "'" + childSnapshot.key + "'" + ">" + 
        "<td id = 'trainNameData'>" + childSnapshot.val().trainName + "</td>" + 
        "<td id = 'destinationData'>" + childSnapshot.val().destination + "</td>" + 
        "<td id = 'frequencyData'>" + childSnapshot.val().frequency + "</td>" + 
        "<td id = 'arrivalData'>" + childSnapshot.val().nextTrainDisplay + "</td>" + 
        "<td id = 'arrivalData'>" + childSnapshot.val().minutesUntilTrain + "</td>" + 
        "<td id='removeButt'>" + "<input type='submit' value='remove train' class='removeTrain'>" + "</td>" +
      "</tr>");

  // Convert the the Arrival Time to appropriate format using Moment.js
  // Optional, but have Minutes Away field decrement with each passing minute. 

  // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


}); //end document ready