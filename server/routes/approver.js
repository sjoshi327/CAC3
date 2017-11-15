let express = require('express');
let router = express.Router();
let mongoose = require('mongoose')

let approver = require('../models/approverData');

//connection from mongo db database
mongoose.connect('mongodb://localhost:27017/centralAccess');
let db = mongoose.connection;

//get Approver Data fom Database (Excel Wala)
router.get('/find', function(req, res, next) {
    approver.find({}, function(err, data) {
        res.json(data);
    });
});

//post employee details
router.post('/employee', function(req, res, next) {
    approver.create(req.body).then(function(data) {
        res.send(data)
    })
})

module.exports = router;