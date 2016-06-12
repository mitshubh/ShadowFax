'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.submitClicked =  function(){
			window.location = "#!/datasets/create";
		}

		$scope.analyzeClicked = function() {
			window.location = "http://localhost:4000/q#eyJuYW1lIjpudWxsLCJkYXRhc2V0X3F1ZXJ5Ijp7ImRhdGFiYXNlIjoyLCJ0eXBlIjoicXVlcnkiLCJxdWVyeSI6eyJzb3VyY2VfdGFibGUiOjQsImFnZ3JlZ2F0aW9uIjpbInJvd3MiXSwiYnJlYWtvdXQiOltdLCJmaWx0ZXIiOltdfX0sImRpc3BsYXkiOiJ0YWJsZSIsInZpc3VhbGl6YXRpb25fc2V0dGluZ3MiOnt9fQ==";
		}
	}
]);
