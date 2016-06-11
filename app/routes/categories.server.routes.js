'use strict';
//Test check

module.exports = function(app) {
    var categories = require('../../app/controllers/categories.server.controller');
    var users = require('../../app/controllers/users.server.controller');

    // Routing logic
    app.route('/categories')
        .get(categories.list)
        .post(users.requiresLogin, categories.create);

    app.route('/categories/:categoryId')
        .get(users.requiresLogin, categories.read);
};
