var logUpdate=require("log-update"),activeProcesses=[],externalLogger=console.log,newProcess=function(e,o){var s=new Process(e,o);return activeProcesses.push(s),s},maskLogs=function(){console.log=newLogger},unmaskLogs=function(){console.log=externalLogger},newLogger=function(e){logUpdate.clear(),externalLogger(e),activeProcesses.forEach(function(e){e.updateProgress()})},Process=function(e,o){var s=this,n=0,r=function(){n=0,g()},t=function(e){n=e||n,g()},c=function(){n=o,g(),logUpdate.done(),activeProcesses.splice(activeProcesses.indexOf(s),1)},a=function(){return process.stdout.columns-1},g=function(){var s=a(),r=s*n/o,t=r?new Array(parseInt(r,10)).join(",").split(",").map(function(e){return"*"}).join(""):"*",c=parseInt(100*n/o,10);logUpdate("Running: "+e+" ("+c+"%)\n"+t)};return{start:r,updateProgress:t,end:c}};maskLogs(),module.exports={newProcess:newProcess,maskLogs:maskLogs,unmaskLogs:unmaskLogs,log:newLogger};