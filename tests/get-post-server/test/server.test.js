/* eslint-disable no-undef */
const server = require('../server');
const request = require('request');
const fs = require('fs');
const path = require('path');
const config = require('config');
const assert = require('assert');
const http = require('http');

describe('server tests', () => {
  before(done => {
    server.listen(3000, done);
  });
  after(done => {
    server.close(done);
  });
  describe('GET', () => {
    it('index.html', done => {
      /*
      1. run server
      2. request index.html
      3. compare response
       */
      request.get('http://localhost:3000', (err, res, body) => {
        if (err) { return done(err); }

        const content = fs.readFileSync(path.join(config.get('publicRoot'), 'index.html'), { encoding: 'utf-8' });
        //console.log(content);

        assert.strictEqual(content, body);
        done();
      });
    });
  });

  describe('POST', () => {
    it('empty file', done => {
      const postQuery = http.request('http://localhost:3000/file.txt', { method: 'POST' }, res => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          console.log(body);
          done();
        });
      });
      postQuery.write('lol');
      postQuery.end();
    });
  });
  //describe('DELETE', () => {});
});