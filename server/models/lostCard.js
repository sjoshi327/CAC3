//lost card model class
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//lost card form schema   
var lostCardSchema = new Schema({
 employeeID: {
  type: String,
  unique: true
},

employeeName: {
  type: String,
},

empType: {
  type: String
},

accessType: {
  type: String,
},

designation: {
  type: String,
},

dateOfJoining: {
  type: String,
},

dateOfExpiry: {
  type: String,
},

project: {
  type: String,
},

department: {
  type: String,
},

existingProject: {
  type: String,
},

newProject: {
  type: String,
},

requestDate: {
  type: String,
},

prev: {
  type: String
},

current: {
  type: String
},

zone: {
  type: Array
},

cardno: {
  type: String
},

issuedBy: {
  type: String
},

issueDate: {
  type: String
},
date: {
  type: String,
},
comment: {
  type: String
}
});

var data = mongoose.model('lost', lostCardSchema)
module.exports = data;