/**
 * Created by mittalsh on 6/11/2016.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    _ = require('lodash'),
    LineInputStream = require('line-input-stream'),
    fs = require('fs'),
    async = require('async'),
    Schema = mongoose.Schema;

var entrySchema = new Schema({},{ strict: false });

var Entry = mongoose.model('RiderBulkSchema', entrySchema );

var stream = new LineInputStream(fs.createReadStream('./../Datasets/rider_location.csv',{ flags: 'r' }));

stream.setDelimiter('\n');


exports.create = function(req, res) {
    console.log('Enter Rider Create!');
    mongoose.connection.on('open', function (err, conn) {

        // lower level method, needs connection
        var bulk = Entry.collection.initializeOrderedBulkOp();
        var counter = 0;

        console.log('Enter Connection On !');
        stream.on('error', function (err) {
            console.log(err); // or otherwise deal with it
        });

        stream.on('line', function (line) {

            async.series(
                [
                    function (callback) {
                        var row = line.split(',');     // split the lines on delimiter
                        var obj = {};
                        // other manipulation

                        bulk.insert(obj);  // Bulk is okay if you don't need schema
                                           // defaults. Or can just set them.

                        counter++;

                        if (counter % 1000 === 0) {
                            //stream.pause(); //lets stop reading from file until we finish writing this batch to db
                            bulk.execute(function (err, result) {
                                if (err) throw err;   // or do something
                                // possibly do something with result
                                bulk = Entry.collection.initializeOrderedBulkOp();
                                callback();
                                //stream.resume(); //continue to read from file
                            });
                        } else {
                            callback();
                        }
                    }
                ],
                function (err) {
                    // each iteration is done
                }
            );

        });

        stream.on('end', function () {

            if (counter % 1000 !== 0)
                bulk.execute(function (err, result) {
                    if (err) throw err;   // or something
                    // maybe look at result
                });
        });

    });

};

/**
 * Create a RiderLoc
 */
/*exports.create = function(req, res) {

};*/

/**
 * Show the current RiderLoc
 */
exports.read = function (req, res) {

};

/**
* Update a RiderLoc
*/
exports.update = function(req, res) {

};

/**
 * List of RiderLoc
 */
exports.list = function(req, res) {

};
