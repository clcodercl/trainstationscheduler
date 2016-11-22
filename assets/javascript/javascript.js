src = "https://www.gstatic.com/firebasejs/3.3.0/firebase.js";

// Initialize Firebase

var config = {
    apiKey: "AIzaSyBQ8BUaY1O9uh1WeHfzPv6JKDV5zYskNbA",
    authDomain: "train-scheduler-d183c.firebaseapp.com",
    databaseURL: "https://train-scheduler-d183c.firebaseio.com",
    storageBucket: "train-scheduler-d183c.appspot.com",
};
firebase.initializeApp(config);
//variables
var trainLine;
var trainDestination;
var trainFrequency = 5;
var firstTime = "12:00"
var firstTimeConverted = moment(firstTime, "hh:mm");
var now = moment().format('LT');
var trainDifference = moment().diff(moment(firstTimeConverted), "minutes");
var trainRemainder = trainDifference % trainFrequency;
var trainMinutes = trainFrequency - trainRemainder;
var nextTrain = moment().add(trainMinutes, "minutes")
    


$("#addTrainButton").on("click", function() {
    trainLine = $("#trainLineInput").val().trim();
    trainDestination = $("#trainDestinationInput").val().trim();
    firstTime = $("#firstTimeInput").val().trim();
    trainFrequency = $("#trainFrequencyInput").val().trim();

    console.log(now);
    console.log("train: " + trainLine);
    console.log("destination: " + trainDestination);
    console.log("frequncy: " + trainFrequency);
    console.log("first time: " + firstTime);
    console.log("time difference: " + trainDifference);
    console.log(trainRemainder);
    console.log("minutes away: " + trainMinutes);
    console.log("arrival: " + moment(nextTrain).format("hh:mm"))

    var newTrain = {
        train: trainLine,
        destination: trainDestination,
        time: firstTime,
        frequency: trainFrequency,
    };

    $("#trainLineInput").html(trainLine);
    $("#trainDestinationInput").html(trainDestination);
    $("#firstTimeInput").html(nextTrain);
    $("trainFrequencyInput").html(trainFrequency);

    firebase.database().ref().push(newTrain);

    $("#trainLineInput").val("");
    $("#trainDestinationInput").val("");
    $("#firstTimeInput").val("");
    $("trainFrequencyInput").val("");

    var newTrainData =
        "<td>" + trainLine + "</td>" + "<td>" + trainDestination + "</td>" + "<td>" + firstTime + "</td>" + "<td>" + trainFrequency + "</td>" + "<td>" + trainMinutes + "</td>"

    var newRow = $("<tr>").append(newTrainData);
    $("#trainTable").append(newRow);
    return false;

    database.ref("#addTrainButton").set(null);
});