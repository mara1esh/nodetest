const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const {pipeline} = require('stream');

const inFile = fs.createReadStream(__dirname + '/file.txt', { encoding: 'utf8'});
//console.log(inFile);

const outFile = fs.createWriteStream(__dirname + '/file.out.txt.gz', { encoding: 'utf8' });

let gzip = zlib.createGzip();

pipeline(
  inFile,
  gzip,
  outFile,
  err => {
    if (err) {
      console.log(err);
    }
  }
);