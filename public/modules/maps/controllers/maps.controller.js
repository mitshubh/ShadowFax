angular.module('maps').controller('MapsController', ['$scope', '$http', '$location', 'fileUpload', '$q', MapsController]);

function MapsController($scope, $http, $location, fileUpload, $q) {

    var vm = this;

    // vm.header = false;
    // vm.content='';
    // vm.separator=',';
    // vm.result='';

    // $scope.$watch('vm.result', function(nv){
    // 	console.log(nv);
    // }, true);



    // var latLong =[
    // [12.9603304,	77.6366083],
    // [12.9603357,	77.6366072],
    // [12.9603206,	77.6365965],
    // [12.9603797,	77.6365901],
    // [12.9603788,	77.6365934],
    // [10.5113799,76.1532099],
    // [12.9603149	,77.6365983],
    // [12.9602845	,77.6366151],
    // [12.9603344	,77.6365851],
    // [12.9603369	,77.6365851],
    // [12.9604435	,77.6366026],
    // [12.960322	,77.6366194],
    // [12.9602682,	77.6366137],
    // [12.960305	,77.6366616],
    // [12.9602979	,77.6366228],
    // [12.9603106	,77.6366312],
    // [12.9589447	,77.6384765],
    // [12.9584737	,77.6397935],
    // [12.9577956	,77.6413886],
    //  [13.012858,77.6192464],
    // [12.9579749	,77.6413606],
    // [12.9869216,77.6512554]
    // ];

    var longs = [
        77.62121994, 77.64000110, 77.65309733, 77.64737095, 77.61346618, 77.67404610, 77.58479970, 77.70881602, 77.72460993, 77.59891064, 77.5628187
    ];
    var lats = [
        12.93779663, 12.97711057, 12.95864689, 12.91103293, 12.91726328, 12.92601312, 12.92151896, 12.95606712, 12.97378525, 12.88753730, 12.9188782
    ];
    vm.clusterIds = [38, 39, 41, 42, 52, 53, 56, 74, 91, 96, 100];
    vm.counts = [89, 190, 282, 175, 182, 9, 227, 53, 142, 101, 261];
    vm.formattedLocs = [];
    vm.heatMapInds = [];
    var marker = null;
    var i = 0;

    var jsonObj = {};

    for (var i = 0; i < lats.length; i++) {
        jsonObj[i] = { lat: lats[i], lng: longs[i] };
    }


    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: 12.930284, lng: 77.6630635 },
        mapTypeId: google.maps.MapTypeId.TERRAIN
    });


    var fillColors = ['red', 'green', 'blue'];
    var addresses = [];
    var index = 0;

    function autoUpdate() {

        // Create the map.
        // Construct the circle for each value in citymap.
        // Note: We scale the area of the circle based on the population.
        for (var city in jsonObj) {


            console.log('maps.googleapis.com/maps/api/geocode/json?latlng=' + jsonObj[city]['lat'] + ',' + jsonObj[city]['lng']);
            // Simple GET request example:
            $http({
                method: 'GET',
                url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + jsonObj[city]['lat'] + ',' + jsonObj[city]['lng']
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available


                var placeInd = ((response.data.results.length - 6) > 2) ? 2 : (response.data.results.length - 6);
                vm.formattedLocs.push(response.data.results[placeInd].formatted_address);
                addresses.push(response.data.results[0].formatted_address);


                var infowindow = new google.maps.InfoWindow;
                var marker = new google.maps.Marker({
                    position: response.data.results[0].geometry.location,
                    map: map
                });
                var content = '<div id="content">' +
                    '<p><b>' + response.data.results[0].formatted_address + '</b></p>' +
                    '<p>Cluster ID: ' + vm.clusterIds[index] + '</p>' +
                    '<p>HEAT MAP INFORMATION</p><p><b>' + vm.counts[index] / 400 + '</b></p>' +
                    '</div>';
                infowindow.setContent(content);
                marker.addListener('click', function() {

                    infowindow.open(map, marker);
                });
                vm.heatMapInds.push(parseFloat(vm.counts[index] / 400));
                // Add the circle for this city to the map.
                var cityCircle = new google.maps.Circle({
                    strokeColor: 'black',
                    strokeOpacity: vm.counts[index] / 400,
                    strokeWeight: vm.counts[index] / 400,
                    fillColor: 'red',
                    fillOpacity: vm.counts[index] / 400,
                    map: map,
                    center: response.data.results[0].geometry.location,
                    radius: 900
                });

                index++;


            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.

            });

        }

    }


    autoUpdate();
    vm.locationFocus = function(index) {
        map.setZoom(14);
        map.panTo({ lat: lats[index], lng: longs[index] });

    };


    $scope.uploadFile = function() {
        var file = $scope.myFile;
        console.log('file is ');
        console.dir(file);
        var uploadUrl = "/dataupload";
        fileUpload.uploadFileToUrl(this.name, this.description, file, uploadUrl, $location);
    };


}
