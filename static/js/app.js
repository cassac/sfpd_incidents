var assignIcon = function(incident) {
	var iconUrl;
	switch (incident['Category']) {
	    case 'LARCENY/THEFT':
	        iconUrl = '/static/icons/criminal29.png';
	        break;
	    case 'OTHER OFFENSES':
	        iconUrl = '/static/icons/criminal7.png';
	        break;
	    case 'NON-CRIMINAL':
	        iconUrl = '/static/icons/criminal18.png';
	        break;
	    case 'ASSAULT':
	        iconUrl = '/static/icons/violent.png';
	        break;
	    case 'VEHICLE THEFT':
	        iconUrl = '/static/icons/criminal15.png';
	        break;
	    case 'VANDALISM':
	        iconUrl = '/static/icons/glyphicons-373-spray.png';
	        break;
	    case 'WARRANTS':
	        iconUrl = '/static/icons/handcuffs.png';
	        break;
	    case 'BURGLARY':
	        iconUrl = '/static/icons/criminal9.png';
	        break;
	    case 'SUSPICIOUS OCC':
	        iconUrl = '/static/icons/criminal3.png';
	        break;
	    case 'MISSING PERSON':
	        iconUrl = '/static/icons/criminal2.png';
	        break;
	    case 'DRUG/NARCOTIC':
	        iconUrl = '/static/icons/glyphicons-493-medicine.png';
	        break;
	    case 'ROBBERY':
	        iconUrl = '/static/icons/criminal25.png';
	        break;
	    case 'FRAUD':
	        iconUrl = '/static/icons/criminal7.png';
	        break;
	    case 'SECONDARY CODES':
	        iconUrl = '/static/icons/criminal7.png';
	        break;
	    case 'WEAPON LAWS':
	        iconUrl = '/static/icons/criminal27.png';
	        break;
	    case 'TRESPASS':
	        iconUrl = '/static/icons/two165.png';
	        break;
	    default:
	    	iconUrl = '/static/icons/criminal16.png'
	}
	return $SCRIPT_ROOT + iconUrl
}

var shortCoords = function(xcoord, ycoord) {
	x = xcoord.split('.');
	x1 = x[0];
	x2 = x[1].slice(0, 6);
	xcoord = x1 + '.' + x2;

	y = ycoord.split('.');
	y1 = y[0];
	y2 = y[1].slice(0, 6);
	ycoord = y1 + '.' + y2;

	return [parseFloat(xcoord), parseFloat(ycoord)]
};

var incidentToGoogleLatLng = function(incident) {
	coords = shortCoords(incident['X'],
		incident['Y']);
	return new google.maps.LatLng(
		 coords[1], // y coordinate first
		 coords[0] // x coordinate second
	)
};

var drawIncidentsMap = function(incidentsData) {
	var map = new google.maps.Map(document.getElementById('googleMap'), {
		center: new google.maps.LatLng(37.7577,-122.4376),
		zoom: 13
	});
	for (var i = 0; i < incidentsData.incidents.length; i++) {
		drawMarker(incidentsData.incidents[i]);
	}
	var markerCluster = new MarkerClusterer(map, markers);
};

var markers = []
var drawMarker = function(incident) {
	var marker = new google.maps.Marker({
	  position: incidentToGoogleLatLng(incident),
      icon: assignIcon(incident),
	  title: incident['Descript']
	});
	markers.push(marker);
	assignIcon(incident)
};

var get_data = function() {
	var amount = $('#selectAmount').val()
	$.ajax({
		url: '/incidents',
		data: {'amount': amount},
		headers: {
		  'Accept': 'application/json'
		},
		success: function(incidentsData) {
		  drawIncidentsMap(incidentsData);
		},
		error: function(error){
			console.log('Error: ', error)
		}
	}); // ajax	
};

$( "#selectAmount" ).change(function() {
	markers = []
	get_data(); 
});


$(document).ready(function(){
	get_data(); 
});