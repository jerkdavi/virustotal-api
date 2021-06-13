/*jshint esversion: 8 */
//Auto-Result; Non-Recursively; Def-Path; Checks-if-File

require('dotenv').config();
//var path = require('path');
var { resolve } = require('path');
var fs = require('fs');
var VirusTotalApi = require('virustotal-api');
var virusTotal = new VirusTotalApi(process.env.TOKEN);
var dir = process.env.DIR;

const wait=(time)=>new Promise((resolve)=>setTimeout(resolve, time));

async function autoresult0() {
  fs.readdir(dir, async function(err,files) {
    if(err) { return console.log(`Unable to scan directory:  ${err}`); }

    for (let file of files) {
    //files.forEach(async function(file) {
      fs.readFile(process.env.RESULT, async function(err, ifscnd) { 
        if(err) { console.log(`Cannot read file. ${err}`); }
        else {
          if(ifscnd.includes(file)) { console.log(`${file} >> already scanned!`); } 
          else{
            var res = resolve(dir, file);
            //var res = path.join(dir, file);
            var dok = fs.statSync(res);
            if(dok.isFile()) {
              fs.readFile(res, async function(err,data) {
                if(err) { console.log(`Cannot read file. ${err}`); }
                else {
                  console.log(file);
                  //virusTotal
                  virusTotal.fileScan(data,`${file}`).then(async function(response) {
                    let resource = response.resource;
                    virusTotal.fileReport(resource).then(async function(result) {
                      //console.log(result);
                      fs.appendFile(process.env.RESULT, `${file}: ` + JSON.stringify(result, ['verbose_msg','total','positives']) + '\n', function(err) {
                        if(err) { console.log(`${file}: Not Saved!\n${err}`); }
                        else { console.log(`${file}: Saved!`); }
                      });
                    });
                  });
                  //.catch(err => console.log(`Scan failed. ${err}`));
                  //if(!err) { console.log('Scan succesful'); }
                  if(err) { console.log(`Scan failed. ${err}`); }
	          else { console.log('Scan succesful'); }
                }
              });
            }
          }
        }
      });
      await wait(30000);
    }
  });
}

autoresult0().then(async function(err) {
  if (err) { console.log(err); }
  else {
    //files => console.log(files);
  }
});
/*autoresult0().then(() => {
}).catch(err => {
  console.log(err);
});*/
/*autoresult0()
  .then(files => console.log(files))
  .catch(e => console.error(e));*/

