'use strict';
//Test check
var multer = require('multer');
var express = require('express');
var parseFile = require('./../utility/parseCSVFile');

module.exports = function(app) {
    var riders = require('../../app/controllers/categories.server.controller');
    var users = require('../../app/controllers/users.server.controller');

    // Routing logic
    app.post('/dataupload', parseFile.upload, parseFile.model, parseFile.parse);
};
