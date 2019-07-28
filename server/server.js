'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require("mongodb").MongoClient
const Issue = require('./issue.js')

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json({type:['text/xjson','application/json']}));


/**const issues = [
  { id: 1, status: 'Open', owner: 'Favan',
  created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
  title: 'Error in console when clicking Add'},
  { id: 2, status: 'Assigned', owner: 'Eddie',
  created: new Date('2016-08-16'), effort: 14, completionDate: new Date ('2016-08-15'),
  title: 'missing bottom border on panel'},
];
**/

app.get('/api/issues', (req,res)=>{
 db.collection('issues').find().toArray().then(issues => {
 const metadata = {total_count: issues.length}; // object containing metadata
  //res.json('respond');
 res.json({_metadata: metadata, records: issues});// respond by converting to jason
 }).catch(error => {
   console.log(error);
   res.status(500).json({message:`internal server error: ${error}`});	
 });
});                         //object containing metadata and issues to json file  

app.post('/api/issues', (req,res)=> {
    const newIssue = req.body;
    //newIssue.id = issues.length+1;
    newIssue.created = new Date();
    if (!newIssue.status)
      newIssue.status = 'New';

    const err = Issue.validateIssue(newIssue);
    if (err){
      res.status(422).json({ message: `Invalid request: ${err}` });
      return;
    }
    db.collection('issues').insertOne(newIssue).then(result =>
      db.collection('issues').find({_id:result.insertedId}).limit(1).next()
    ).then(newIssue => {
      res.json(newIssue);
    }).catch(error => {
      console.log(error);
      res.status(500).json({message:`internal server error: ${error}`})
    })
   /** issues.push(newIssue); 

     res.json(newIssue);
     **/
});


let db;

MongoClient.connect("mongodb://localhost/issuetracker").then(connection => {
 db = connection
 app.listen(4000, function(){
  console.log('App started on port 4000');
   });
 }).catch(error =>{
  console.log('Error:',error);
 })

