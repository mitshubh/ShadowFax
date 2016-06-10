'use strict';

module.exports = function(app) {
    var categories = require('../../app/controllers/categories.server.controller');
    var users = require('../../app/controllers/users.server.controller');

    // Routing logic
    app.route('/categories')
        .get(users.requiresLogin, categories.list)
        .post(users.requiresLogin, categories.create)

    app.route('/categories/:categoryId')
        .get(users.requiresLogin, categories.read);


};

    // the categoryId param is added to the params object for the request
    app.route('/categories/:categoryId')
