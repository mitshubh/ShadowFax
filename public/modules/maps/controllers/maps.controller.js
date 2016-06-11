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
[13.012858,77.6192464],
[12.9579749	,77.6413606],
[12.9869216,77.6512554]
];
13.012858,77.6192464
var marker = null;
var i=0;
      var citymap = {
        chicago: {
          center: {lat: 12.9602979, lng: 87.6366137},
          population: 2714856
        },
        newyork: {
          center: {lat: 2.9869216, lng: 77.6512554},
          population: 8405837
        },
        losangeles: {
          center: {lat:15.9576685, lng: 67.6414069},
          population: 3857799
        },
        vancouver: {
          center: {lat: 12.9869216, lng: 77.6366194},
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


        var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: {lat: 12.9603797, lng: 77.6366083},
    map: map,
    title: 'Uluru (Ayers Rock)'
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });


var fillColors=['red','green','blue'];
        // Construct the circle for each value in citymap.
        // Note: We scale the area of the circle based on the population.
        for (var city in jsonObj) {
        	var fc=fillColors[parseInt(city)%3];
        	console.log(fillColors[city]);
          // Add the circle for this city to the map.
          var cityCircle = new google.maps.Circle({
            strokeColor: 'red',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: fc,
            fillOpacity: 0.35,
            map: map,
            center: jsonObj[city],
            radius: 500
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