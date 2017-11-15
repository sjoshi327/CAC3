let express = require('express');
let router = express.Router();
let mongoose = require('mongoose')

let lost = require('../models/lostCard');

//connection from mongo db database
mongoose.connect('mongodb://localhost:27017/centralAccess');
let db = mongoose.connection;

//get lost data
router.get('/findlost', function(req, res, next) {
    lost.find({}, function(err, data) {
        res.json(data);
    });
});

//api for lost card
router.post('/lostInsert', function(req, res, next) {
    lost.create(req.body).then(function(data) {
        res.send(data);
    })
})

module.exports = router;