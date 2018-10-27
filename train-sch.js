var trainName;
var trainDest;
var trainTime;
var trainFreq;
// Initialize Firebase
var config = {
    apiKey: "AIzaSyD5K1ThjjjWr9PiWrINaKJ4rMLvHquTScA",
    authDomain: "train-time-momentjs.firebaseapp.com",
    databaseURL: "https://train-time-momentjs.firebaseio.com",
    projectId: "train-time-momentjs",
    storageBucket: "",
    messagingSenderId: "656907908843"
};
firebase.initializeApp(config);
var database = firebase.database();

function getMomentFromTimeString(string) {
    var time = moment(string, "HH:mm");

    return time;
}

$("#submitBtn").on("click", function () {
    trainName = $("#trainName").val();
    trainDest = $("#trainDestination").val();
    trainTime = $("#trainTime").val();
    trainFreq = $("#trainFreq").val();

    database.ref("schedule").push({
        Name: trainName,
        Destination: trainDest,
        Time: trainTime,
        Frequency: trainFreq
    })
});

var schedule = database.ref("schedule")

schedule.on("value", getData)

function getData(data) {
    var response = data.val()
    var keys = Object.keys(response)

    for (var j = 0; j < keys.length; j++) {

        let ulList = $("<ul>")
        ulList.addClass(["info", "list-group", "list-group_flush"])

        let ilList = $("<li>")
        ilList.addClass("list-group-item")
        ulList.append(ilList)


        let outerDiv = $("<div>")
        outerDiv.addClass(["text-center", "row"])
        outerDiv.append(
            '<div class="col-md-1"></div>'
        )

        let ids = keys[j]
        let nameOfTrain = response[ids].Name;
        let destinationOfTrain = response[ids].Destination;
        let timeOfTrain = response[ids].Time;
        let frequencyOfTrain = response[ids].Frequency;
        console.log(timeOfTrain)


        let nameTrainDiv = $("<div>");
        nameTrainDiv.addClass("col-md-2");
        nameTrainDiv.text(nameOfTrain);
        outerDiv.append(nameTrainDiv);

        let destinationTrainDiv = $("<div>");
        destinationTrainDiv.addClass("col-md-2");
        destinationTrainDiv.text(destinationOfTrain);
        outerDiv.append(destinationTrainDiv);

        let frequencyTrainDiv = $("<div>");
        frequencyTrainDiv.addClass("col-md-2");
        frequencyTrainDiv.text(frequencyOfTrain);
        outerDiv.append(frequencyTrainDiv);


        // was trying to find out next time train available unable to 
        let firstTimeConverted = moment(timeOfTrain, "hh:mm").subtract(1, "years");
        let currentTime = moment();
        let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        let tRemainder = diffTime % frequencyOfTrain;
        let minutesTillTrain = frequencyOfTrain - tRemainder;
        let nextTrain = moment().add(minutesTillTrain, "minutes");
        let nextTrainFormatted = moment(nextTrain).format("hh:mm");

        console.log(firstTimeConverted)

        let timeTrainDiv = $("<div>");
        timeTrainDiv.addClass("col-md-2");
        timeTrainDiv.text(timeOfTrain);
        // timeTrainDiv.text(timeOfTrain);
        outerDiv.append(timeTrainDiv);

        // Here I would have made my conversion to minutes away
        outerDiv.append(
            '<div class="col-md-2">minutes away</div>'
        )
        outerDiv.append(
            '<div class="col-md-1"></div>'
        )

        ilList.append(outerDiv);

        $(".info").append(ilList)


    };
}