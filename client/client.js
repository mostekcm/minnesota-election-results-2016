var express = require('express');
var app = express();

app.use(express.static(__dirname + '/../public'));
app.use('/node_modules',express.static(__dirname + '/../node_modules'));
app.use('/dist',express.static(__dirname + '/../dist'));

module.exports = app;
