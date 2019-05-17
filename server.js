const http = require('http');

const server = new http.Server();

let i = 0;

server.on('request', (res, req) => {
    i++;
    res.end('Hello world ' + i);
});

const emit = server.emit;

server.emit = (...args) => {
    console.log(args[0]);
    return emit.apply(server, args);
}

server.listen(3000);