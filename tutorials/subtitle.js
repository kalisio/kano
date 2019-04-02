//import pathBuilder from './pathBuilder'
const pathBuilder = require('./pathBuilder');
export default class Subtitle{
    constructor(){
        //Record variable
        
        this.startTimer = Date.now()/1000;
        this.timerOn = new Array();
        this.timerOff = new Array();
        this.userStorie = new Array();
        //this.testAsso = new Object();  
        this.Logs = "";
        this.pathBuild = pathBuilder.getPath();

    }

    //Start the initial timer
    initStart(){
        this.startTimer = Date.now()/1000;
    }
    //Return the time since test start
    newTimer(){     
        return (Date.now()/1000-this.startTimer).toString().toHHMMSS();
      }
      
    //Save a start timer and an action
     startRecord(action){
         console.log('Subtitle start record action : '+action)
        var time = Date.now();
        //this.testAsso[time['action']] = action; 
        //console.log(time + '| |'+this.testAsso[time['action']]);
        this.userStorie.push(action);
        this.timerOn.push(this.newTimer());
    }
    
    //Save a stop timer
     stopRecord(){
        this.timerOff.push(this.newTimer());
    }
    
    //Buil log for the .srt format
     buildLogs(){
        this.Logs = "";
        for (let index = 0; index < this.userStorie.length; index++) {
            this.Logs += (index+1 + '\n' +this.timerOn[index]+' --> '+ this.timerOff[index] +'\n'+ this.userStorie[index]+'\n\n');    
        }
        //console.log('Log : \n'+this.Logs);
    }
    //Build and save log
     exportLogs(path){
        console.log('Subtitle export init : \n'+this.logs)
        this.buildLogs();
        var fs = require('fs');
        this.pathBuild = pathBuilder.getPath();
        pathBuilder.newFolder(this.pathBuild);
        //console.log('DEBUG subtitles.js exportLogs | path : '+this.pathBuild);
        fs.writeFile(this.pathBuild+'/'+path+'.srt', this.Logs, function (err) {
            if (err) throw err;
            console.log('Subtitle saved!');
            //fs.unlink('./test/pathBuilder.txt');
        });
    }
}


String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
  
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds+',000';
  }