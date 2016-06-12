'use strict';

// Dataset module config
angular.module('datasets').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Datasets', 'Datasets', 'dropdown', '/datasets(/create)?');
		Menus.addSubMenuItem('topbar', 'Datasets', 'List Datasets', 'datasets');
		Menus.addSubMenuItem('topbar', 'Datasets', 'New Datasets', 'datasets/create');
	}
]);
