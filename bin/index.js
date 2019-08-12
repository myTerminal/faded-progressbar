"use strict";var _createClass=function(){function o(s,e){for(var r=0;r<e.length;r++){var o=e[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(s,o.key,o)}}return function(s,e,r){return e&&o(s.prototype,e),r&&o(s,r),s}}();function _classCallCheck(s,e){if(!(s instanceof e))throw new TypeError("Cannot call a class as a function")}var logUpdate=require("log-update"),processes=[],externalLogger=console.log,Process=function(){function o(s,e,r){_classCallCheck(this,o),this._processTitle=s,this._processLength=e,this._processes=r,this._progress=0}return _createClass(o,[{key:"_getTerminalWidth",value:function(){return process.stdout.columns-1}},{key:"_printProgress",value:function(){var s=this._getTerminalWidth()*this._progress/this._processLength,e=s?new Array(parseInt(s,10)).join(",").split(",").map(function(){return"*"}).join(""):"*",r=parseInt(100*this._progress/this._processLength,10);logUpdate("Running: "+this._processTitle+" ("+r+"%)\n"+e)}},{key:"start",value:function(){this._progress=0,this._printProgress()}},{key:"updateProgress",value:function(s){this._progress=s||this._progress,this._progress<this._processLength?this._printProgress():this.end()}},{key:"end",value:function(){this._progress=this._processLength,this._printProgress(),logUpdate.done(),this._processes.splice(this._processes.indexOf(this),1)}}]),o}(),newLogger=function(s){logUpdate.clear(),externalLogger(s),processes.forEach(function(s){s.updateProgress()})},maskLogs=function(){console.log=newLogger},unmaskLogs=function(){console.log=externalLogger};module.exports.newProcess=function(s,e){var r=new Process(s,e,processes);return processes.push(r),r},module.exports.maskLogs=maskLogs,module.exports.unmaskLogs=unmaskLogs,maskLogs();