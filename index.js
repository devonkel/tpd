var express = require('express');
var mongoose = require('mongoose');
var dataAccess = require('./data-access.js');
var app = express();

var server_port = 3000;
var server_ip = '127.0.0.1';

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('db connected');
});

app.listen(server_port, server_ip, function() {
    console.log('Our server is running!!!');
});

app.get('/',function(req, res) {
    res.sendfile('./index.html');
});

//Call script.js
app.get('/script.js',function(req, res) {
    res.sendfile('./script.js');
});

app.get('/data', function(req, res) {
    dataAccess.getStuff(function(err, data) {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
    //        console.log('Got records!');
        res.send(data);
    });
});

app.get('/add', function(err,res) {
    var newRecord = new Region({
        region: '2',
        regionData: [{
            station: 'BWI',
            lastUpdDt: '04/01/15'}]
    });
    dataAccess.addStuff(Region, newRecord, function(err, result) {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.redirect('/');
    });
});

app.get('/delete', function (err,res) {
    console.log('About to delete record.');
    dataAccess.deleteStuff(
        { 'regionData.station': 'BWI'}, 
        function(err, region) {
            if (err) {
                console.log('Problem deleting BWI station');
                console.log(err);
                handleError(err);
                return res.sendStatus(500);
            }
            return res.redirect('/');
        });
});