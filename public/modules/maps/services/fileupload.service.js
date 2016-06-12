
angular.module('maps').service('fileUpload', ['$http',
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
]).directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }]);;