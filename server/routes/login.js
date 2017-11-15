let express = require('express');
let router = express.Router();
var request = require('request');

let sql = require("mssql");

let con = require('../config/config');

//configuartion file for connection
sql.connect(con.config, function(err) {
    if (err) console.log(err);
    // create sqlRequest object
    var sqlRequest = new sql.Request();

//validate token
router.get('/',function(req,res,next) {
   request.get('https://iniitiandev2.niit-tech.com/mobile/Cmn/CmnService/Authenticate?Token='+req.headers.authorization,
   	function(error, response, body){
  let data = JSON.parse(body);
  let role ='';

if(data.isvalid){

	sqlRequest.query( `SELECT in_rolecode FROM ecc_authorization WHERE  bit_active = 1 AND ch_empcode ='`+ req.headers['authorization'] +`'` , function (err, recordset) {
   // try{
       if (err) {
        res.status(500).send({success:false,message:'',data:err.toString()});
        console.log(err);
      }
        let hrroles = recordset.recordset.filter((role) =>{
          return role.in_rolecode === 3;
        })
        let csoroles = recordset.recordset.filter((role) =>{
          return role.in_rolecode === 9;
        })
        let suproles = recordset.recordset.filter((role) =>{
          return role.in_rolecode === 15;
        })
        if(hrroles.length >0){
          role = 'HR';
        } else if(csoroles.length >0) {
          role = 'CSO';
        } else if(suproles.length >0) {
          role = 'SUPERVISOR';
        } else {
          role = 'EMPLOYEE';
        }
        data.role= role;
        res.status(200).json({success:true,message:'token validated',data:data});
     
   	});

}
   else{
   	res.status().send({success:false,message:'invalid token'});
   }
 });
 })

router.get('/getData/:empId', (req, res) => {
        sqlRequest.query(con.query + req.params.empId + `'`, function(err, recordset) {
          
            res.json(recordset.recordsets)
        });
});

})

module.exports = router;
