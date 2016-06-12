'use strict';

angular.module('datasets').controller('DatasetsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Datasets', 'fileUpload', '$http',
	function($scope, $stateParams, $location, Authentication, Datasets, fileUpload, $http) {
		$scope.authentication = Authentication;
		$scope.currentPage = 1;
		$scope.pageSize = 5;
		$scope.offset = 0;

		// Page changed handler
		$scope.pageChanged = function() {
			$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
		};

		// Create new Dataset
		$scope.create = function() {
			// Create new Dataset object
			var dataset = new Datasets ({
				name: this.name,
				description: this.description
			});

			// Redirect after save
			dataset.$save(function(response) {
				$location.path('datasets/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Dataset
		$scope.remove = function(dataset) {
			if ( dataset )	 {
				dataset.$remove();

				for (var i in $scope.datasets) {
					if ($scope.datasets[i] === dataset) {
						$scope.datasets.splice(i, 1);
					}
				}
			} else {
				$scope.dataset.$remove(function() {
					$location.path('datasets');
				});
			}
		};

		// Update existing Dataset
		$scope.update = function() {
			var dataset = $scope.dataset;

			dataset.$update(function() {
				$location.path('datasets/' + dataset._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Datasets
		$scope.find = function() {
			$scope.datasets = Datasets.query();
		};

		// Find existing Dataset
		$scope.findOne = function() {
			$scope.dataset = Datasets.get({
				datasetId: $stateParams.datasetId
			});
			var parseUrl = "datasets/" + $stateParams.datasetId + "/data";
			$http.get(parseUrl)
				.success(function(response) {
					$scope.parseData = response;
					$scope.dimensions = Object.keys(response[0]);
					/*var myMessage = '{"objs":' + JSON.stringify(response,null,2) +
						'}';
					var parsedVal = JSON.parse(myMessage);
					return parsedVal;*/
				})
				.error(function (errorResponse) {
					$scope.parseData = response;
				});
		};

		//Upload File
		$scope.uploadFile = function(){
			var file = $scope.myFile;
			console.log('file is ' );
			console.dir(file);
			var uploadUrl = "/dataupload";
			fileUpload.uploadFileToUrl(this.name, this.description, file, uploadUrl, $location);
		};

		// Search for a dataset
		$scope.datasetSearch = function(product) {
			$location.path('datasets/' + product._id);
		};

		$scope.parJson = function (json) {
			var myMessage = '{"objs":' + JSON.stringify(json,null,2) +
				'}';
			var parsedVal = JSON.parse(myMessage);
			return parsedVal;
		}

		$scope.plotHeatMap = function() {
			//window.location.href = "/maps";
			$location.path("maps");
		}
	}
]);
