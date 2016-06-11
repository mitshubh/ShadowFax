'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Dataset = mongoose.model('Dataset'),
    _ = require('lodash');

var logger = require('./logger');
var Schema  =  mongoose.Schema;

module.exports = {
    createDataset: function(name, desc, callback) {
        var dataset = new Dataset({
            name: name,
            description: desc
        });

        dataset.save(function(err) {
            if (err) {
                logger.error(err.message);
                return callback(err);
            } else {
                return callback(null, dataset);
            }
        });
    },
    createModel: function(datasetName, columns) {
        var dataSchema = new Schema();
        dataSchema.add(columns);
        mongoose.model(datasetName, dataSchema);
        // return DataModel;
    },
    upload: function(datasetName, datapoint, onError) {
        var DataModel = mongoose.model(datasetName);
        var data = new DataModel(datapoint);
        data.save(function(err) {
            if (err) {
                onError(datapoint, {reason: err.message});
            }
        });
    }
};
