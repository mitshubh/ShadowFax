'use strict';

//Categories service used to communicate Categories REST endpoints
angular.module('datasets').factory('Datasets', ['$resource',
	function($resource) {
		return $resource('datasets/:datasetId', { datasetId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

angular.module('datasets').service('fileUpload', ['$http',
    function ($http) {
        this.uploadFileToUrl = function(name, description, file, uploadUrl, $location){
            var fd = new FormData();
            fd.append('name', name);
            fd.append('description', description);
            fd.append('csvfile', file);

            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })

                .success(function(response){
                    $location.path('datasets/' + response._id);
                })

                .error(function(){
                });
        }
    }
]);
