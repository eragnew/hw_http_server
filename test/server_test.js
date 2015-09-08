'use strict';

var chai = require('chai');
var expect = chai.expect;
var chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

var server_url = 'http://localhost:3000';

describe('GET /greet/name', function() {

  var res;

  before(function(done) {
    chai.request(server_url)
      .get('/greet/joe')
      .end(function(response) {
        res = response;
        done();
      });
  });

  it('should connect with a 200 status code', function() {
    expect(res).to.have.status(200);
  });

  it('should respond with a greeting to <name>', function() {
    expect(res.text).to.equal('hello from our server, joe!');
  });

});

describe('POST /greet', function() {

  var res;

  before(function(done) {
    chai.request(server_url)
      .post('/greet')
      .send({name: 'joe'})
      .end(function(response) {
        res = response;
        done();
      });
  });

  it('should connect with a 200 status code', function() {
    expect(res).to.have.status(200);
  });

  it('should respond with a greeet to <name>', function() {
    expect(res.text).to.equal('hello from our server, joe!');
  });

});

describe('GET /time', function() {

  var res;

  before(function(done) {
    chai.request(server_url)
      .get('/time')
      .end(function(response) {
        res = response;
        done();
      });
  });

  it('should connect with a 200 status code', function() {
    expect(res).to.have.status(200);
  });

  it('should respond with the current date/time of the server', function() {
    expect(res.text).to.equal(Date());
  });

});

describe('GET /other', function() {

  var res;

  before(function(done) {
    chai.request(server_url)
      .get('/other')
      .end(function(response) {
        res = response;
        done();
      });
  });

  it('should response with a 404 status code', function() {
    expect(res).to.have.status(404);
  });

  it('should respond with "page not found" message', function() {
    expect(res.text).to.equal('page not found');
  });

});

