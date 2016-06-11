'use strict';

// Setting up route
angular.module('maps').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('maps', {
			url: '/maps',
			templateUrl: 'modules/maps/views/maps.view.html',
			controller: 'MapsController as vm'
		})
		.state('path', {
			url: '/path',
			templateUrl: 'modules/maps/views/path.view.html',
			controller: 'PathController as vm'
		});
	}
]);