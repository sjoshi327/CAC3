let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser')

//database connection
let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/centralAccess');
let db = mongoose.connection;

//requiring employee data model class
let employee = require('./models/employeeData');

const readline = require('readline');
const fs = require('fs');

let b = [];
let i = 0;

//read csv file
const rl = readline.createInterface({
    input: fs.createReadStream('./data/acs.csv')
});

//converting data from csv to json
rl.on('line', (line) => {
    a = line
        .split(',')

    let obj = {
        serial: a[0],
        project: a[1],
        phase: a[2],
        access: a[3],
        proCat: a[4],
        appAuth: a[5],
        appEmp: a[6]
    }

    b.push(obj);

    if (obj.serial == "")
        obj.serial = b[i - 1].serial

    if (obj.project == "")
        obj.project = b[i - 1].project

    if (obj.phase == "")
        obj.phase = b[i - 1].phase

    if (obj.access == "")
        obj.access = b[i - 1].access

    if (obj.proCat == "")
        obj.proCat = b[i - 1].proCat

    if (obj.appAuth == "")
        obj.appAuth = b[i - 1].appAuth

    if (obj.appEmp == "")
        obj.appEmp = b[i - 1].appEmp

    //inserting json data into mongo db database
    employee.collection.insert(obj, function(err, r) {
        if (err)
            console.log("error");
        else
            console.log(r);
    })

    i++;
})

var f
rl.on('close', () => {})