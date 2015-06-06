var mongoose = require('mongoose');

var regionSchema = mongoose.Schema({
    region: String,
    regionData: [{
        station: String,
        lastUpdDt: String
    }]
});

var Region = mongoose.model('Region', regionSchema);

var addStuff = function(Region, record, callback) {
    console.log('Save', Region.save );
    Region.save(function(err, record) {
        if(err) {
            callback(err);
        }
        callback(null, record);
    });
}

var getStuff = function(callback) {
    Region.find( function(err, data) {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
    //        console.log('Got records!');
        callback(null, data);
    });
}

var deleteStuff = function(query, callback) {
    Region.findOneAndRemove(query, function(err, region){
        if (err) {
            callback(err);
        }
        callback(null, region); 
    });
}

module.exports.addStuff = addStuff;
module.exports.getStuff = getStuff;
module.exports.deleteStuff = deleteStuff;