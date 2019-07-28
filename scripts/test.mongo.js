var db = new Mongo().getDB("playground1");
db.employees.insert({name:{first:'John'},age:44});
db.employees.insert({name: {first: 'John',middle:'H', last:'Doe'},age:22});
db.employees.insert({name: {first: 'James',middle:'J', last:'Doe'},age:22});

