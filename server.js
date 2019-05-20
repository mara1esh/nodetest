const http = require('http');
const handler = require('./handler');
const server = new http.Server();

server.on('request', handler);

const emit = server.emit;

server.emit = (...args) => {
  console.log(args[0]);
  return emit.apply(server, args);
};
server.listen(3000);