# faded-progressbar

[![npm version](https://badge.fury.io/js/faded-progressbar.svg)](https://badge.fury.io/js/faded-progressbar)
[![npm downloads](https://img.shields.io/npm/dt/faded-progressbar.svg)](https://www.npmjs.com/package/faded-progressbar)  
[![Build Status](https://travis-ci.org/myTerminal/faded-progressbar.svg?branch=master)](https://travis-ci.org/myTerminal/faded-progressbar)
[![Code Climate](https://codeclimate.com/github/myTerminal/faded-progressbar.png)](https://codeclimate.com/github/myTerminal/faded-progressbar)
[![Package Quality](http://npm.packagequality.com/shield/faded-progressbar.svg)](http://packagequality.com/#?package=faded-progressbar)
[![Coverage Status](https://img.shields.io/coveralls/myTerminal/faded-progressbar.svg)](https://coveralls.io/r/myTerminal/faded-progressbar?branch=master)
[![bitHound Overall Score](https://www.bithound.io/github/myTerminal/faded-progressbar/badges/score.svg)](https://www.bithound.io/github/myTerminal/faded-progressbar)
[![bitHound Code](https://www.bithound.io/github/myTerminal/faded-progressbar/badges/code.svg)](https://www.bithound.io/github/myTerminal/faded-progressbar)  
[![Dependency Status](https://david-dm.org/myTerminal/faded-progressbar.svg)](https://david-dm.org/myTerminal/faded-progressbar)
[![devDependency Status](https://david-dm.org/myTerminal/faded-progressbar/dev-status.svg)](https://david-dm.org/myTerminal/faded-progressbar#info=devDependencies)
[![peer Dependency Status](https://david-dm.org/myTerminal/faded-progressbar/peer-status.svg)](https://david-dm.org/myTerminal/faded-progressbar#info=peerDependencies)  
[![License](https://img.shields.io/badge/LICENSE-GPL%20v3.0-blue.svg)](https://www.gnu.org/licenses/gpl.html)
[![Gratipay](http://img.shields.io/gratipay/myTerminal.svg)](https://gratipay.com/myTerminal)  
[![NPM](https://nodei.co/npm/faded-progressbar.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/faded-progressbar/)

A simple, light-weight and customizable progress bar for command-line applications

![Demo](images/demo.gif)

## Features

* Easy to use with only a few methods.

## How to Use

Simply do a `require` and create a process as

    var fadedProgressbar = require('faded-progressbar');
    var newProcess = fadedProgressbar.newProcess("Some long running process", 20);

First argument is the process title that is to be displayed on the console, the second is the total number of sub-tasks in the process.

To print the start of the process, simply invoke `start()`.

    newProcess.start();

When the process progresses (in small steps), invoke `updateProgress()` passing in the new progress number.

    newProcess.updateProgress(15);

When the process ends, invoke `end()` which prints *100%* againsts the process title and shows a completed progress bar.

    newProcess.end();
    
You are free to use the console to print any logs while a process is active, *faded-progressbar* takes care of maintaining a single progress bar at the end of the console automatically.

By default, the package replaces the default `console.log()` method with an internal one, which is almost the same but with a few extra functionality. You can turn this feature off by invoking `unmaskLogs()`.

    fadedProgressbar.unmaskLogs();

Once turned off, you would be able to use the default `console.log()` again. This should not be required in usual cases though.

You can also enable the feature with the exact opposite method: `maskLogs()`.
    
## Dependencies

* [log-update](https://www.npmjs.com/package/log-update)

## To-do

* Customizable progress bar character
* Animations
