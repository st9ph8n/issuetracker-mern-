
//const React = require('React');
var num = 2

class IssueList extends React.component {
  constructor(){
      this.state ={ issue : num }
       setTimeout(this.createTestIssue(),2000);
   }
   
    createIssue(newnum){
      this.setState({issue: newnum})
      console.log(this.state)
     }
   
     createTestIssue(){
          this.createIssue(4)
    }

 }

 var newissue = new IssueList
 console.log(newissue.state)
