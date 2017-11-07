/* global require module process */

var logUpdate = require('log-update'),

    activeProcesses = [],

    externalLogger = console.log,

    newProcess = function (processTitle, processLength) {
        var newProcess = new Process(processTitle, processLength);

        activeProcesses.push(newProcess);
        return newProcess;
    },

    maskLogs = function () {
        console.log = newLogger;
    },

    unmaskLogs = function () {
        console.log = externalLogger;
    },

    newLogger = function (text) {
        logUpdate.clear();
        externalLogger(text);

        activeProcesses.forEach(function (p) {
            p.updateProgress();
        });
    },

    Process = function (processTitle, processLength) {
        var self = this,
            progress = 0,

            start = function () {
                progress = 0;
                printProgress();
            },

            updateProgress = function (ellapsedProgress) {
                progress = ellapsedProgress || progress;

                if (progress < processLength) {
                    printProgress();
                } else {
                    end();
                }
            },

            end = function () {
                progress = processLength;
                printProgress();
                logUpdate.done();
                activeProcesses.splice(activeProcesses.indexOf(self), 1);
            },

            getTerminalWidth = function () {
                return process.stdout.columns - 1;
            },

            printProgress = function () {
                var terminalWidth = getTerminalWidth(),
                    progressBarWidth = terminalWidth * progress / processLength,
                    progressBarString = progressBarWidth ?
                    new Array(parseInt(progressBarWidth, 10))
                    .join(',')
                    .split(',')
                    .map(e => '*')
                    .join('')
                    : '*',
                    progressPercentage = parseInt(100 * progress / processLength, 10);

                logUpdate('Running: '
                          + processTitle
                          + ' ('
                          + progressPercentage + '%'
                          + ')'
                          + '\n'
                          + progressBarString);
            };

        return {
            start: start,
            updateProgress: updateProgress,
            end: end
        };
    };

maskLogs();

module.exports = {
    newProcess: newProcess,
    maskLogs: maskLogs,
    unmaskLogs: unmaskLogs,
    log: newLogger
};
