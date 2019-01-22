var config = {
    apiKey: "AIzaSyAW7HdHO66gJTJBopTeQ6Q3qBrtWFMC3kI",
    authDomain: "test-project-ed14a.firebaseapp.com",
    databaseURL: "https://test-project-ed14a.firebaseio.com",
    projectId: "test-project-ed14a",
    storageBucket: "test-project-ed14a.appspot.com",
    messagingSenderId: "251668976270"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

var name = "";
var destination = "";
var time = 0;
var frequency = 0;

$("#add-train").on("click", function(event) {
    event.preventDefault();

    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    time = $("#time-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    dataRef.ref().push({
    name: name,
    destination: destination,
    time: time,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

dataRef.ref().on("child_added", function(childSnapshot) {

    $("#full-train-list").append(
    `<div class='well'>
        <span class='train-name'>${childSnapshot.val().name}</span>
        <span class='train-destination'>${childSnapshot.val().destination}</span>
        <span class='train-time'>${childSnapshot.val().time}</span>
        <span class='train-frequency'>${childSnapshot.val().frequency}</span>
    </div>`);

}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

});
