
var app = angular.module('App', ['ngRoute', 'ngResource', 'ngMaterial']);

app.controller('AppController', function($scope, $http, $q) {

	console.log("controller loaded");


  
});

app
	.directive('map', function() {
		return {
			restrict: 'E',
			template: '<div id="map"></div>',
			scope: {data: '@'},
			link: function(scope, elem) {
				var unit = 'pm2_5';

				d3.json('data/national/national.geojson',function(error,json) {
					
					json.features.forEach(function(d) {
						d.properties[unit] = parseInt(d.properties[unit]);
					});
					console.log(json);


					var geojson = json;
					mapboxgl.accessToken = 'pk.eyJ1IjoibHl5dmFsaGFsbGEiLCJhIjoiY2l0NTBwbDQ3MDAyMDJ4bGowbmNodHBmZCJ9.2tT64Gvn_N-yvUtjVn_Eew';
					var map = new mapboxgl.Map({
					    container: 'map',
					    style: 'mapbox://styles/mapbox/streets-v9',
					    zoom: 5,
					    center: [123.43278, 41.79222]
					});
					map.addControl(new mapboxgl.NavigationControl());
					// map.setLayoutProperty('pm25', 'text-field', '{name_zh}');
					map.on('load', function() {
						map.addSource("pm25", {
				        type: "geojson",
				        data: geojson,
				        cluster: true,
				        clusterMaxZoom: 14, // Max zoom to cluster points on
				        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
				    });

						map.addLayer({
				        "id": "pm25",
				        "type": "circle",
				        "source": "pm25",
				        'paint': {
			            // make circles larger as the user zooms from z12 to z22
			            'circle-radius': {
			                'base': 100,
			                'stops': [[4, 20],[4, 50],[8, 50], [11, 50], [16, 50]]
			                // 'base': 20,
			                // 'stops': [[2, 10],[4, 20],[8, 300], [11, 500], [16, 800]]
			            },
			            'circle-blur': 1,
			            'circle-opacity': 0.8,
			            "circle-opacity-transition": {duration: 0},
			            "circle-radius-transition": {duration: 0},
			            'circle-color': {
			                property: unit,
			                type: 'interval',
			                stops: [
			                    [0, '#00E400'],
			                    [50, '#00E400'],
			                    [100, '#FFFF00'],
			                    [150, '#FF7E00'],
			                    [200, '#FF0000'],
			                    [300, '#99004C'],
			                    [500, '#7E0023']
			                  ]
			            	}
		       			}
				    });

				    map.addLayer({
				    	"id": "points",
        			"type": "symbol",
        			"source": "pm25",
        			"layout": {
			            "text-field": "{"+unit+"}",
			            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
			            "text-offset": [0, -0.5],
			            "text-anchor": "top", 
			            "text-size": 36
			        },
			        "paint": {
			        	"text-color": "#ffffff",

			        }
				    });
				    

					});// end of map.on('load')


				});//end of d3.json

			


			}//end of link
		}
	});	




