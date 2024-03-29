'use strict';

var express = require('express');
var cors = require('cors');
const bodyParser= require('body-parser')
let multer = require('multer');

var upload = multer({ dest: 'uploads/' })


var app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  // req.file is the `upfile` file
  // req.body will hold the text fields, if there were any
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send({name:req.file.originalname,type:req.file. mimetype,size:req.file.size})
 
})
 
app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
