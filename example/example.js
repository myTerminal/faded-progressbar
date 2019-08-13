/* global require setTimeout */

const fadedProgressbar = require('../build');

let progress = 0;

const messages = [
    'Starting up',
    'Counting till ten!',
    'Unpacking boxes',
    'Separating out the good things',
    'Making things tidy',
    'Applying colors',
    'Getting more stuff',
    'Adding images',
    'Applying good fonts',
    'Brewing coffee!',
    'Having a short nap',
    'Waking up',
    'Losing temper',
    'Settling down',
    'Packing things up'
];

const incrementProgess = () => {
    progress++;
};

const process = fadedProgressbar.newProcess('The same old thing', 15);

process.start();

const routine = () => {
    if (progress < 15) {
        console.log(messages[progress]);
        incrementProgess();
        process.updateProgress(progress);
        setTimeout(routine, 200);
    }
};

setTimeout(routine, 1000);
