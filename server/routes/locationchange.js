let express = require('express');
let router = express.Router();
let mongoose = require('mongoose')

//connection from mongo db database
mongoose.connect('mongodb://localhost:27017/centralAccess');
let db = mongoose.connection;

let location = require('../models/locationChange');
//get location change data
router.get('/findlocation', function(req, res, next) {
    location.find({}, function(err, data) {
        res.json(data);
    });
});

//api for Location change
router.post('/locationInsert', function(req, res, next) {
    location.create(req.body).then(function(data) {
        res.send(data)
    })
})

module.exports = router;