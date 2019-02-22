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

var test_id;
var reply_id;

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
   
    suite('GET', function() {
      //list recent threads
    test('List Recent Threads',(done)=>{//create thread
      chai.request(server)
      .get('/api/threads/test')
      .end((err,res)=>{
      test_id = res.body[0]._id;
      assert.equal(res.status,200);
      assert.isArray(res.body);
      assert.property(res.body[0], '_id');
      assert.property(res.body[0], 'replies');
      assert.property(res.body[0], 'text');
      assert.property(res.body[0], 'created_on');
      assert.property(res.body[0], 'bumped_on');
      assert.notProperty(res.body[0], 'delete_password');
      assert.notProperty(res.body[0], 'reported');
      assert.isAtMost(res.body[0].replies.length, 3);
      assert.isAtMost(res.body.length, 10);
      done();
    
    });
  }); 
  });
      
      suite('PUT', function() {
      //report thread
      test('Report a Thread',(done)=>{
      chai.request(server)
      .put('/api/threads/test')
      .send({
      _id: test_id
      })
      .end((err,res)=>{
      assert.equal(res.status,200);
      assert.equal(res.body, 'success');
      assert.equal(res.body.reported, true);
      done();
    
    });
  });
    });
      
    suite('DELETE', function() {
      //delete thread with password
      test('Incorrect Password to Delete Threads with Password',(done)=>{
      chai.request(server)
      .delete('/api/threads/test')
      .send({
      _id: test_id,
      delete_password: 'test password'
      })
      .end((err,res)=>{
      assert.equal(res.status,200);
      assert.equal(res.body, 'incorrect password');
      done();
    
    });
  });
      
      test('Correct Password to Delete Threads with Password',(done)=>{
      chai.request(server)
      .delete('/api/threads/test')
      .send({
      _id: test_id,
      delete_password: 'test password'
      })
      .end((err,res)=>{
      assert.equal(res.status,200);
      assert.equal(res.body, 'success');
      done();
    
    });
  });
      
      
    });
    
  });

  suite('API ROUTING FOR /api/replies/:board', function() {
    
    suite('POST', function() {
      
    test('Create Reply on a thread',(done)=>{
      chai.request(server)
        .post('/api/replies/test')
        .send({
      thread_id: test_id, 
      text: 'reply text',
      delete_password: 'test test test'
      })
      .end((err,res)=>{
      assert.equal(res.status,200);
      expect(res).to.redirect;
      done();
      });
    });
  });
    
    suite('GET', function() {
      test('Get Replies on a Thread',(done)=>{
      chai.request(server)
        .get('/api/replies/test')
      .end((err,res)=>{
        console.log('reply_id: '+res.body);
      assert.equal(res.status,200);
      done();
      });
    });
    });
    
    suite('PUT', function() {
    test('Report Reply on a Thread',(done)=>{
      chai.request(server)
        .put('/api/replies/test')
        .send({
      thread_id: test_id, 
      text: 'reply text',
      delete_password: 'test test test'
      })
      .end((err,res)=>{
      assert.equal(res.status,200);
      done();
      });
    });
    });
    
    suite('DELETE', function() {
     test('Incorrect Delete Password to Delete Reply on a Thread',(done)=>{
      chai.request(server)
        .delete('/api/replies/test')
        .send({
      thread_id: test_id, 
      reply_id: reply_id,
      text: 'reply text',
      delete_password: 'test test test'
      })
      .end((err,res)=>{
      assert.equal(res.status,200);
      assert.equal(res.body,'incorrect password');
      done();
      });
    });
    test('Correct Delete Password to Delete Reply on a Thread',(done)=>{
      chai.request(server)
        .delete('/api/replies/test')
        .send({
      thread_id: test_id, 
      reply_id: reply_id,
      delete_password: 'test test test'
      })
      .end((err,res)=>{
      assert.equal(res.status,200);
      assert.equal(res.body,'success');
      done();
      });
    });  
    
    });
    
  });
});
  