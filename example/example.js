/* global require setTimeout */

var fadedProgressbar = require("faded-progressbar"),
    progress = 0,
    messages = [
        "Starting up",
        "Counting till ten!",
        "Unpacking boxes",
        "Separating out the good things",
        "Making things tidy",
        "Applying colors",
        "Getting more stuff",
        "Adding images",
        "Applying good fonts",
        "Brewing coffee!",
        "Having a short nap",
        "Waking up",
        "Losing temper",
        "Settling down",
        "Packing things up"
    ],
    incrementProgess = function () {
        progress++;
    };

var process = fadedProgressbar.newProcess("The same old thing", 15);

process.start();

var routine = function () {
    if (progress < 15) {
        console.log(messages[progress]);
        incrementProgess();
        process.updateProgress(progress);
        setTimeout(routine, 200);
    }
};

setTimeout(routine, 1000);
