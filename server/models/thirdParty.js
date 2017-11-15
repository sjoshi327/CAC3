  //third party model class
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  //third party form schema
  var thirdPartySchema = new Schema({
      category: {
          type: String
      },
      location: {
          type: String
      },
      employeeName: {
          type: String
      },
      employeeId: {
          type: String
      },
      visitorName: {
          type: String
      },
      visitingPurpose: {
          type: String
      },
      duration: {
          type: String
      },
      dateOfVisiting: {
          type: String
      },
      signature: {
          type: String
      },
      applicationDate: {
          type: String
      }
  });

  var data = mongoose.model('thirdParty', thirdPartySchema)
  module.exports = data;