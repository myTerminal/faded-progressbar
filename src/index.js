/* global require module process */

const logUpdate = require('log-update');

const processes = [],
    externalLogger = console.log;

class Process {
    constructor(processTitle, processLength, processesCollection) {
        this._processTitle = processTitle;
        this._processLength = processLength;
        this._processes = processesCollection;
        this._progress = 0;
    }

    _getTerminalWidth() {
        return process.stdout.columns - 1;
    }

    _printProgress() {
        const terminalWidth = this._getTerminalWidth(),
            progressBarWidth = terminalWidth * this._progress / this._processLength,
            progressBarString = progressBarWidth
                ? new Array(parseInt(progressBarWidth, 10))
                    .join(',')
                    .split(',')
                    .map(() => '*')
                    .join('')
                : '*',
            progressPercentage = parseInt(100 * this._progress / this._processLength, 10);

        logUpdate(`Running: ${this._processTitle} (${progressPercentage}%)
${progressBarString}`);
    }

    start() {
        this._progress = 0;
        this._printProgress();
    }

    updateProgress(ellapsedProgress) {
        this._progress = ellapsedProgress || this._progress;

        if (this._progress < this._processLength) {
            this._printProgress();
        } else {
            this.end();
        }
    }

    end() {
        this._progress = this._processLength;
        this._printProgress();
        logUpdate.done();
        this._processes.splice(this._processes.indexOf(this), 1);
    }
}

const newLogger = text => {
    logUpdate.clear();
    externalLogger(text);

    processes.forEach(
        p => {
            p.updateProgress();
        }
    );
};

const maskLogs = () => {
    console.log = newLogger;
};

const unmaskLogs = () => {
    console.log = externalLogger;
};

// Exports
module.exports.newProcess = (title, processLength) => {
    const process = new Process(title, processLength, processes);

    processes.push(process);

    return process;
};
module.exports.maskLogs = maskLogs;
module.exports.unmaskLogs = unmaskLogs;

// Mask logs by default
maskLogs();
