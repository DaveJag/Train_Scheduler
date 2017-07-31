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

    // Create a variable to reference the database
    var database = firebase.database();

    //Initialize variables 
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
        event.preventDefault();
        //Capture data from all input fields and assign to variables.
        trainName = $("#nameInput").val().trim();
        destination = $("#destinationInput").val().trim();
        firstTrainTime = $("#firstTrainTimeInput").val().trim();
        frequency = $("#frequencyInput").val().trim();
        //Use moment.js to convert input times, calculate next Train
        firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
        currentTime = moment();
        diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        remainder = diffTime % frequency;
        minutesUntilTrain = frequency - remainder;
        nextTrain = moment().add(minutesUntilTrain, "minutes");
        nextTrainDisplay = moment(nextTrain).format("hh:mm");

        //Provide the initial data to the database.
        database.ref().push({    
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

    // This callback keeps the page updated when a value changes in firebase.
    database.ref().on("child_added", function(childSnapshot) {

    // This "snapshot" allows the page to get the most current values in firebase.
      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().firstTrainTime);
      console.log(childSnapshot.val().frequency);
      console.log(childSnapshot.val().nextTrainDisplay);
      console.log(childSnapshot.val().minutesUntilTrain);
      
    //Write values to table.
     $("#trainScheduleTableId").append(
      "<tr class ='tableRow' id = " + "'" + childSnapshot.key + "'" + ">" + 
        "<td id = 'trainNameData'>" + childSnapshot.val().trainName + "</td>" + 
        "<td id = 'destinationData'>" + childSnapshot.val().destination + "</td>" + 
        "<td id = 'frequencyData'>" + childSnapshot.val().frequency + "</td>" + 
        "<td id = 'arrivalData'>" + childSnapshot.val().nextTrainDisplay + "</td>" + 
        "<td id = 'arrivalData'>" + childSnapshot.val().minutesUntilTrain + "</td>" + 
      // Future feature: "<td id='removeButt'>" + "<input type='submit' value='Remove' class='removeTrain'>" + "</td>" +
      "</tr>");

    //Doesn't work yet.
    //Set an event handler for the the Remove button.
    /* $(".tableRow #removeButt .removeTrain").on("click", function () {
        console.log("Remove button clicked.")
        event.preventDefault();
        //get row index
        var selectedRow = $("#removeButt").parent().rowIndex;
        console.log("Selected Row index is " + selectedRow);
    });
*/

  // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
 
}); //end document ready