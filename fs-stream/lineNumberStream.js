const stream = require('stream');
const fs = require('fs');
const os = require('os');

class LineNumberStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.isLineBegins = true;
    this.line = 1;
    this.eolRegex = new RegExp(os.EOL, 'g');
  }

  _transform(chunk, encoding, callback) {
    let str = chunk.toString('utf-8');

    // if(this.isLineBegins) {
    //   this.isLineBegins = false;
    //   str = `${this.line}. ${str}`;
    //   this.line++;
    // } else if (str.includes(os.EOL)){
    //   this.isLineBegins = true;
    // }
    if(this.isLineBegins) {
      str = `${this.line}. ${str}`;
      this.line++;
      this.isLineBegins = false;
    }

    if(str.includes(os.EOL)) {
      str = str.replace(this.eolRegex, `${os.EOL}${this.line}. `);
      this.line++;
    }    
    callback(null, Buffer.from(str));
  }
}

const inFile = fs.createReadStream(__filename, { encoding: 'utf-8', highWaterMark: 10 });
const outFile = fs.createWriteStream(`${__filename}.out`);

inFile
  .pipe(new LineNumberStream({ encoding: 'utf-8' }))
  .pipe(outFile)
  .on('end', () => console.log('end'));