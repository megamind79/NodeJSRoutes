var express =   require("express");
var fs = require("fs-extra");
var multer  =   require('multer');
var router = express.Router();

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads/');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + file.originalname);
  }
});

var upload = multer({ storage : storage }).any();

router.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
});

router.post('/',function(req,res){
    console.log("posted");
    console.log(req.body);
    upload(req,res,function(err) {
    	//if (req.files.length == 0)	res.status(404).send("FILES LENGTH = 0");
    	if(err) {
            console.error(err);
            return res.end("Error uploading file.");
        }
        console.log(req.body);
        console.log(req.files);
        res.end("File is uploaded");
    });
});

module.exports = router;