let express = require('express');
let router = express.Router();
let mongoose = require('mongoose')

let thirdParty = require('../models/thirdParty');

//connection from mongo db database
mongoose.connect('mongodb://localhost:27017/centralAccess');
let db = mongoose.connection;

//get third party data
router.get('/findthird', function(req, res, next) {
    thirdParty.find({}, function(err, data) {
        res.json(data);
    });
});

//api for third party
router.post('/thirdInsert', function(req, res, next) {
    thirdParty.create(req.body).then(function(data) {
        res.send(data)
    })
})

module.exports = router;