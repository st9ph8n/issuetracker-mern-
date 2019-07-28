'use strict';
const MongoClient = require('mongodb');

function usage(){
  console.log('Usage:');
  console.log('node',__filename,'<option>');
  console.log('where option is one of:');
  console.log(' callbacks use the callbacks paradigm');
  console.log(' promises use the Promises paradigm');
  console.log(' generator use the Generator paradigm');
  console.log(' async use the async paradigm');
 }

 if (process.argv.length < 3){
    console.log("Incorrect number of arguments");
    usage();
      } else {
        if (process.argv[2] === 'callbacks'){
	testWithCallbacks();
     } else if (process.argv[2] === 'promises'){
        testWithPromises();
      } else if (process.argv[2] === 'generator'){
    	testWithGenerator();
      } else if (process.argv[2] === 'async'){
        testWithAsync();
      } else {
         console.log("Invalid option:", process.argv[2]);
	 usage();
	}
   }
//most calls in java scripts are asynchrous unlike c
  function testWithCallbacks(){
    Mongoclient.connect('mongodb://localhost/playground',{useNewUrlParser:true},function(err,db){
	db.collection('employees').insertOne({id:1, name:'A.callback'},
	 function(err,result){
	  console.log("Result of insert:",result.insertedId);
	  db.collection('employees').find({id:1}).toArray(function(err,docs){
	     console.log('Result of find:',docs);
		db.close();
		});	
	      });
	    });
  }
// promises use then
 function testWithPromises(){
  let db;
  MongoClient.connect('mongodb://localhost/playground').then(connection => {
	db = connection;
	 return db.collection('employees').insertOne({id:1, name:'B.promises'});

    }).then(result => {
	console.log("Result of insert:", result.insertedId);
	return db.collection('employee').find({id:1}).toArray();
	
	}).then(docs => {
	  console.log('Resullt of find:', docs);
	   db.close();

	}).catch(err => {
	  console.log('Error',err)
	})
  }

 function testWithGenerator(){
   const co = require('co');
   co(function*(){
    const db = yield MongoClient.connect('mongodb://localhost/playground');
    const result =yield db.collection('employees').insertOne({id: 1,name: 'c. Generator'});
    console.log('Result of insert:',result.insertedId);

    const docs = yield db.collection('employees').find({id: 1}).toArray();
    console.log('Result of find:', docs)

    db.close();
        }).catch(err => {
      console.log('Error',err);
    });

        }
