/*jshint esversion: 8 */
//cleans result.txt

var fs = require('fs');

async function clnres() {
    await fs.writeFile(process.env.RESULT, '', async function (err) {
    if(err) throw err;
    else { await console.log(`Result.txt cleaned!`); }
  });
}

clnres().then(async function(err) {
  if (err) { console.log(err); }
  else {
    //files => console.log(files);
  }
});
/*clnres().then(() => {
}).catch(err => {
  console.log(err);
});*/
/*clnres()
  .then(files => console.log(files))
  .catch(e => console.error(e));*/

