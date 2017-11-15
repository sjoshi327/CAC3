/*let express = require('express');
let router = express.Router();

let sql = require("mssql");

let con = require('../config/config');

//configuartion file for connection
sql.connect(con.config, function(err) {
    if (err) console.log(err);
    // create Request object
    var request = new sql.Request();
    // query to the database and get the records
    router.get('/getData/:empId', (req, res) => {
        request.query(con.query + req.params.empId + `'`, function(err, recordset) {
            if (err) console.log(err);
            else {
                // send records as a response
            }
            res.json(recordset.recordsets)
        });
});
  });

module.exports = router;*/