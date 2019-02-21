/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('API ROUTING FOR /api/threads/:board', function() {
    
    suite('POST', function() {
      
      
      test('Create Thread and Redirect to ./b/:board',(done)=>{//create thread
      chai.request(server)
      .post('/api/threads/test')
      .send({
      board: 'test',
      text: 'test text',
      delete_password: 'test password'
      })
      .end((err,res)=>{
      assert.equal(res.status,200);
      expect(res).to.redirect;
      done();
      });
    });
  });
});
//});
   /*
    suite('GET', function() {
      //list recent threads
    });
    
    suite('DELETE', function() {
      //delete thread with password
    });
    
    suite('PUT', function() {
      //report thread
    });
    

  });
  */
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    suite('POST', function() {
      
    test('Create Reply on a thread',(done)=>{
      chai.request(server)
        .post('/api/replies/test')
        .send({
      thread_id: '5c6ebe415b111413c5d5d516',
      text: 'reply text',
      delete_password: 'test test test'
      })
      .end((err,res)=>{
      assert.equal(res.status,200);
      expect(res).to.redirect;
      done();
      });
      
      
      
    });
    
    
    /*
    suite('GET', function() {
      
    });
    
    suite('PUT', function() {
      
    });
    
    suite('DELETE', function() {
     */ 
    });
    
  });

});
