'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Dataset = mongoose.model('Dataset'),
    _ = require('lodash');

/**
 * Create a Dataset
 */
exports.create = function(req, res) {
    var dataset = new Dataset(req.body);

    dataset.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.status(201).json(dataset);
        }
    });
};

/**
 * Show the current Dataset
 */
exports.read = function(req, res) {
    Dataset.findById(req.params.datasetId).exec(function(err, dataset) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if (!dataset) {
                return res.status(404).send({
                    message: 'Dataset not found'
                });
            }
            res.json(dataset);
        }
    });
};

/**
 * Show the data from vcurrent Dataset
 */
exports.readData = function(req, res) {
    Dataset.findById(req.params.datasetId).exec(function(err, dataset) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if (!dataset) {
                return res.status(404).send({
                    message: 'Dataset not found'
                });
            }
            res.json(dataset);
        }
    });
};

/**
 * Update a Dataset
 */
exports.update = function(req, res) {
    var datasets = req.datasets;

    datasets = _.extend(datasets, req.body);

    datasets.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(datasets);
        }
    });
};

/**
 * Delete an Dataset
 */
exports.delete = function(req, res) {
    var datasets = req.datasets;

    datasets.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(datasets);
        }
    });
};

/**
 * List of Datasets
 */
exports.list = function(req, res) {
    Dataset.find().exec(function(err, datasets) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(datasets);
        }
    });
};
