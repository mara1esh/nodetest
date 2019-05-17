// stream.on('readable', () => {})
// stream.pipe(streamOut);
// stream.on('data', chunk => {});
// stream.resume() | stream.pause();

const fs = require('fs');
const zlib = require('zlib');

const stream = fs.createReadStream(__dirname + '/read.txt', {
  highWaterMark: 40,
  encoding: 'utf-8'
});
const outStream = fs.createWriteStream(__dirname + '/write.txt'); 
let i = 0;
const gzip = zlib.createGzip();

stream.on('data', chunk => {
  i++;
  if(i > 3) {
    stream.removeAllListeners('data');
  }
  console.log(chunk);
  outStream.write(chunk);
  gzip.write(chunk);
});



stream.on('end', () => {
  console.log(i);
  console.log('end');
});

stream.on('close', () => {
  console.log('close');
});

stream.on('error', err => {
  console.log('error', err);
});