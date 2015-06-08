var mongoose = require('mongoose');

var regionSchema = mongoose.Schema({
    region: String,
    regionData: [{
        station: String,
        lastUpdDt: String
    }]
});

var Region = mongoose.model('Region', regionSchema);

var addStuff = function (record, callback) {
//    console.log('Save', Region.save );
    console.log('Saving new record...');
//    Region.save(function (err, record) {
    var x = record.save(function (err) {
        console.log('About to save');
        if (err) {
            callback(err);
        }
        callback(null, record);
    });
};

var getStuff = function (callback) {
    Region.find(function (err, data) {
        if (err) {
            console.log(err);
            return callback(500);
        }
    //        console.log('Got records!');
        callback(null, data);
    });
};

var deleteStuff = function (query, callback) {
    Region.findOneAndRemove(query, function (err, region) {
        if (err) {
            callback(err);
        }
        callback(null, region); 
    });
};

module.exports.addStuff = addStuff;
module.exports.getStuff = getStuff;
module.exports.deleteStuff = deleteStuff;
module.exports.Region = Region;
