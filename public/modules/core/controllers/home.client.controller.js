'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.submitClicked =  function(){
			window.location = "#!/datasets/create";
		}

		$scope.analyzeClicked = function() {
			window.location = "#!/datasets/search";
		}
	}
]);
