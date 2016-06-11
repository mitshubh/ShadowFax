angular.module('maps').controller('MapsController', ['$scope', '$http', '$location','fileUpload', MapsController]);

function MapsController($scope, $http, $location, fileUpload){

	var vm = this;

	vm.header = false;
	vm.content='';
	vm.separator=',';
	vm.result='';

	$scope.$watch('vm.result', function(nv){
		console.log(nv);
	}, true);



var latLong =[
[12.9603304,	77.6366083],
[12.9603357,	77.6366072],
[12.9603206,	77.6365965],
[12.9603797,	77.6365901],
[12.9603788,	77.6365934],
[12.9603149	,77.6365983],
[12.9602845	,77.6366151],
[12.9603344	,77.6365851],
[12.9603369	,77.6365851],
[12.9604435	,77.6366026],
[12.960322	,77.6366194],
[12.9602682,	77.6366137],
[12.960305	,77.6366616],
[12.9602979	,77.6366228],
[12.9603106	,77.6366312],
[12.9589447	,77.6384765],
[12.9584737	,77.6397935],
[12.9577956	,77.6413886],
[12.9578902	,77.6413687],
[12.9579749	,77.6413606],
[12.9576685	,77.6414069]
];

var marker = null;
var i=0;
      var citymap = {
        chicago: {
          center: {lat: 12.9602979, lng: 77.6366137},
          population: 2714856
        },
        newyork: {
          center: {lat: 12.9579749, lng: 77.6413606},
          population: 8405837
        },
        losangeles: {
          center: {lat:12.9576685, lng: 77.6414069},
          population: 3857799
        },
        vancouver: {
          center: {lat: 12.960322, lng: 77.6366194},
          population: 603502
        }
      };
      
      var jsonObj={};

      for(var i=0;i<latLong.length;i++)
      {
      	jsonObj[i]={lat: latLong[i][0], lng: latLong[i][1]};
      }

      function autoUpdate() {
        // Create the map.
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: {lat: 12.9603797, lng: 77.6366083},
          mapTypeId: google.maps.MapTypeId.TERRAIN
        });


        // Construct the circle for each value in citymap.
        // Note: We scale the area of the circle based on the population.
        for (var city in jsonObj) {
        	console.log(city);
          // Add the circle for this city to the map.
          var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#101010',
            fillOpacity: 0.35,
            map: map,
            center: jsonObj[city],
            radius: 150
          });
        }
      }


autoUpdate();


$scope.uploadFile = function(){
			var file = $scope.myFile;
			console.log('file is ' );
			console.dir(file);
			var uploadUrl = "/dataupload";
			fileUpload.uploadFileToUrl(this.name, this.description, file, uploadUrl, $location);
		};


}