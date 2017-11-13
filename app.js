

var config = {
    apiKey: "AIzaSyBnRsh0nZgiR78eFj1YpoDTzOnXUGMEdmA",
    authDomain: "fir-assignment-aeeec.firebaseapp.com",
    databaseURL: "https://fir-assignment-aeeec.firebaseio.com",
    projectId: "fir-assignment-aeeec",
    storageBucket: "fir-assignment-aeeec.appspot.com",
    messagingSenderId: "870352639066"
  };
  firebase.initializeApp(config);


var database = firebase.database();

$('#add-train').on('click', function(event){
	event.preventDefault();

	var trainName = $('#name-input').val().trim();
	var trainDest = $('#destination-input').val().trim();
	var trainFirst = $('#first-train-input').val().trim();
	var trainFreq = $('#frequency-input').val().trim();

	var newTrain = {
		name: trainName,
		destination: trainDest,
		firsttrain: trainFirst,
		frequency: trainFreq
	};

	database.ref().push(newTrain);

	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.firsttrain);
	console.log(newTrain.frequency);

	$('#name-input').val("");
	$('#destination-input').val("");
	$('#first-train-input').val("");
	$('#frequency-input').val("");

})

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
	console.log(childSnapshot.val());

	var trainName = childSnapshot.val().name;
	var trainDest = childSnapshot.val().destination;
	var trainFirst = childSnapshot.val().firsttrain;
	var trainFreq = childSnapshot.val().frequency;

	console.log(trainName);
	console.log(trainDest);
	console.log(trainFirst);
	console.log(trainFreq);

	var tFrequency = trainFreq;
	
    var firstTime = trainFirst;
   
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "days");

    var currentTime = moment();

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = diffTime % tFrequency;

    var tMinutesTillTrain = tFrequency - tRemainder;

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

	$('#myTableId > tbody').append('<tr><td>' + trainName + '</td><td>' + trainDest + '</td><td>' + trainFreq + '</td><td>' + moment(nextTrain).format("hh:mm A") + '</td><td>' + tMinutesTillTrain + '</td></tr>');
});




