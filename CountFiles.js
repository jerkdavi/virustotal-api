/*jshint esversion: 8 */

require('dotenv').config();
const { promisify } = require('util');
const { resolve } = require('path');
const fs = require('fs');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
let i = 0;

async function getFiles(dir) {
  const subdirs = await readdir(dir);
  await Promise.all(subdirs.map(async function(subdir) {
    const res = resolve(dir, subdir);
    var dok = fs.statSync(res);
    if(dok.isFile()) {
      i=i+1;
    }
    console.log(i);
    return (await stat(res)).isDirectory() ? getFiles(res) : res;
  }));
}
getFiles(process.env.DIR)
  .catch(e => console.error(e));

