$http.get('provinces.json').then(function(d) {
  	var provinces = d.data;
  	var array = [];

  	provinces.forEach(function(d) {
  		array.push(
		  		$http({
					  method: 'GET',
					  url: 'http://airapi.epmap.org/api/v1/province/station_list?province='+d.name,
					  headers: {
						  'Authorization': 'APPCODE c04d3d17804a4ea7a2ef54dd3c43b39f'
						}
					}).then(data =>  {
							console.log('success');
							console.log(data.data);
							return data.data;
						  }, error => {
							console.log(error);
						})
			);
  	});

  	$q.all(array).then(function(res) {
		console.log(res);
 		var url = 'data:text/json;charset=utf8,' + encodeURIComponent(JSON.stringify(res));
  	window.open(url, '_blank');
		window.focus();
		
	});

  });


// a province
$http.get('stations.json').then(d=>{
  	
  	var stationList = d.data;
  	stationList.forEach(function(province) {
  		if (province.name === '辽宁省') {
  			console.log(province);
  			var dataArray = [];
  			province.data.forEach(function(p) {
  				dataArray.push(
  					$http({
						  method: 'GET',
						  url: 'http://airapi.epmap.org/api/v1/province/station?station_guid='+p.guid,
						  headers: {
							  'Authorization': 'APPCODE c04d3d17804a4ea7a2ef54dd3c43b39f'
							}
						}).then(data =>  {
								console.log('success');
								console.log(data.data);
								return data.data;
							  }, error => {
								console.log(error);
							})
	  			);
  			});
  			$q.all(dataArray).then(function(res) {
					console.log(res);
			 		var url = 'data:text/json;charset=utf8,' + encodeURIComponent(JSON.stringify(res));
			  		window.open(url, '_blank');
					window.focus();
					
				});

  		}
  	});
});


// geojson 
  $http.get('liaoning_0107.json').then(d=>{
  	
  	console.log(d.data);

  	var stations = d.data;
  	var array = [];
  	var index = 0;
  	d.data.forEach(function(s) {
  		index++;
  		var obj = {};
  		obj.type = "Feature";
  		obj.geometry = {};
  		obj.geometry.type = "Point";
  		obj.geometry.coordinates = [s.data.longitude, s.data.latitude];
  		obj.properties = s.data;
  		array.push(obj);

  		if (index === d.data.length - 1) {
  			var url = 'data:text/json;charset=utf8,' + encodeURIComponent(JSON.stringify(array));
			  window.open(url, '_blank');
				window.focus();
  		}
  	});
  });	



// get national 
  $http.get('stations.json').then(d=>{
    
    var stationList = d.data;
    var dataArray = [];
    console.log(stationList.length);
    var total = 0;
    stationList.forEach(function(province) {
      // total = total + s.data.length;
      province.data.forEach(function(station) {
        
        dataArray.push(
          $http({
            method: 'GET',
            url: 'http://airapi.epmap.org/api/v1/province/station?station_guid='+station.guid,
            headers: {
              'Authorization': 'APPCODE c04d3d17804a4ea7a2ef54dd3c43b39f'
            }
          }).then(data =>  {
              total ++;
              console.log(total);
              console.log(data.data);
              return data.data;
              }, error => {
              console.log(error);
            })
        );//end of push
      });
    });
    console.log(total);
    $q.all(dataArray).then(function(res) {
      console.log(res);
      var url = 'data:text/json;charset=utf8,' + encodeURIComponent(JSON.stringify(res));
      window.open(url, '_blank');
      window.focus();
      
    });
  });

//beijing get long lat
$http.get('beijing_0108.json').then(d=>{
    var b18 = d.data;
    $http.get('beijing_0107.json').then(f=>{
      var b17 = f.data;
        b18.forEach(function(e,i) {
          e.data.longitude = b17[i].data.longitude;
          e.data.latitude = b17[i].data.latitude;

          if (i === b18.length - 1) {
            var url = 'data:text/json;charset=utf8,' + encodeURIComponent(JSON.stringify(b18));
            window.open(url, '_blank');
            window.focus();
          }
        })
    });
  });
