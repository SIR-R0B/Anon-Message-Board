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
var ObjectId   = mongoose.Types.ObjectId;

const CONNECTION_STRING = process.env.DB;

mongoose.connect(CONNECTION_STRING, {useNewUrlParser: true});

var Schema = mongoose.Schema;

var threadModel = new Schema({
      board: {type: String, required: true},
      text: {type: String, required: true},
      created_on: Date,
      bumped_on: {type: Date, default: Date.now},
      reported: {type: Boolean, default: false},
      delete_password:  {type: String, required: true},
      replies: [Schema.Types.Mixed]
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
    
    addThread.save((err,data)=> err ? err : res.redirect('/b/'+req.params.board));
    
  })
  .get((req,res)=>{
  //need to validate the query and projection = an array of the most recent 10 bumped threads on the board with only the most recent 3 replies from /api/threads/{board}. The reported and delete_passwords fields will not be sent.
    thread.find({board: req.params.board}, {replies: {$slice: 3}}).sort({bumped_on: 'desc'}).limit(10).select('-reported').select('-delete_password').select('-__v').select('-replies.delete_password').select('-replies.reported').exec((err,data)=>{
    if (err) err;
      res.json(data);
    });
  
  });
  
  
    
  app.route('/api/replies/:board')
  .post((req,res)=>{
    
    const addReply = ({
    _id: new ObjectId,
    text: req.body.text,
    created_on: new Date(),
    delete_password: req.body.delete_password,
    reported: false
    });
    
    console.log(addReply);
    
    thread.findById({_id: req.body.thread_id},(err,data)=> {
      
      if (err) return err;
      
      data.bumped_on = new Date();
      data.replies.push(addReply);
      data.save((err,data)=> err ? err : res.redirect('/b/'+req.params.board+'/'+req.body.thread_id));
      
      console.log('saved');
      
    });
    
  });
  
  
  
};
