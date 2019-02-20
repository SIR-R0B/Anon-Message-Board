/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect  = require('chai').expect;
var mongoose   = require('mongoose');

const CONNECTION_STRING = process.env.DB;

mongoose.connect(CONNECTION_STRING, {useNewUrlParser: true});

var Schema = mongoose.Schema;

var threadModel = new Schema({
      text: {type: String, required: true},
      created_on: Date,
      bumped_on: {type: Date, default: Date.now},
      reported: {type: Boolean, default: false},
      delete_password:  {type: String, required: true},
      replies: [String]
});

var thread = mongoose.model('thread',threadModel);


module.exports = function (app) {
  
  app.route('/api/threads/:board')
  .post((req,res)=>{
    
    const addThread = new thread({
    board: req.params.board,
    text: req.body.text,
    created_on: new Date(),
    delete_password: req.body.delete_password,
    });
    
    addThread.save((err,data)=> err ? err : res.redirect('/b/'+req.params.board)); //next write the get
    
  });
  
  
    
  app.route('/api/replies/:board');

};
