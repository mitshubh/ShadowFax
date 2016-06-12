'use strict';
var multer = require('multer');
var express = require('express');
var parseFile = require('./../utility/parseCSVFile');

module.exports = function(app) {
	// Routing logic   
	// ...
    var dataset = require('../../app/controllers/dataset.server.controller');
    var users = require('../../app/controllers/users.server.controller');

    app.use('/rejected_data', express.static('./logfiles/rejected-data.log'));

    app.route('/datasets')
        .get(dataset.list)
        .post(users.requiresLogin, dataset.create);

    app.route('/datasets/:datasetId')
        .get(users.requiresLogin, dataset.read);

    app.post('/dataupload', parseFile.upload, parseFile.model, parseFile.parse);

};
