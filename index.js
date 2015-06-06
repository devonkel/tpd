var express = require('express');
var mongoose = require('mongoose');

var app = express();

var server_port = 3000;
var server_ip = '127.0.0.1';

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('db connected');
});

var regionSchema = mongoose.Schema({
    region: String,
    regionData: [{
        station: String,
        lastUpdDt: String
    }]
});

var Region = mongoose.model('Region', regionSchema);


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

/*app.get('/data',function(req, res) {
    res.sendfile('./data.json');
});*/

app.get('/data', function(req, res) {
    Region.find( function(err, data) {
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
    newRecord.save(function(err, record) {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        console.log('Record added - '+ record);
//        res.send(201);
//        return res.sendfile('./index.html');
        return res.redirect('/');
    });
});

app.get('/delete', function (err,res) {
    console.log('About to delete record.');
    Region.findOneAndRemove({ 'regionData.station': 'BWI'},'station', function(err, region){
    if (err) {
        console.log('Problem deleting BWI station');
        console.log(err);
        handleError(err);
        return res.sendStatus(500);
    }
    console.log('BWI deleted.');
//    return res.sendStatus(201);
    return res.redirect('/');
    }
);
});

/*app.get('/stop', function (err,res) {
    console.log('Closing DB');
    db.close();
    if(err) {
        console.log('Error closing DB');
        console.log(err);
        return res.sendStatus(500);
    }
    console.log('DB closed');
});*/