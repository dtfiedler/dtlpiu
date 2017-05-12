
/*
  site.js
*/

$(document).ready(function() {

	"use strict";

	$( "#bestContactMethod" ).change(function() {
	  var selected = $('#bestContactMethod').val();

		switch (selected){
			case 'cellPhone':
				$('#cellPhoneDiv').show();
				$('#workPhoneDiv').hide();
				$('#emailDiv').hide();
				$('#imDiv').hide();
				break;
			case 'workPhone':
				$('#cellPhoneDiv').hide();
				$('#workPhoneDiv').show();
				$('#emailDiv').hide();
				$('#imDiv').hide();
				break;
			case 'email':
				$('#cellPhoneDiv').hide();
				$('#workPhoneDiv').hide();
				$('#emailDiv').show();
				$('#imDiv').hide();
				break;
			case 'im':
				$('#cellPhoneDiv').hide();
				$('#workPhoneDiv').hide();
				$('#emailDiv').hide();
				$('#imDiv').show();
				break;
			default:
				$('#cellPhoneDiv').hide();
				$('#workPhoneDiv').hide();
				$('#emailDiv').hide();
				$('#imDiv').hide();
				break;
		}
	});
});

var centerMap = function (thislat , thislng) {
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: thislat, lng: thislng},
		scrollwheel: false,
		zoom: 8
	});
}

function initMap(){
	console.log("map looks good");
}

var getGeoCoding = function () {
	var zip = document.getElementById('zip_input').value;
	console.log("zip is --> " + zip);
	$('.ui-input-search').css('margin-top',"10px");
	$.ajax({
           type: 'GET',
					 crossOrigin: true,
           contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
           url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + zip + '&key=AIzaSyDlXmT_QhVJ9uaXhekOtOTb5zSABTMDW5k'
				}).done(function(data){
					// Center the map at the requested zip code.
					centerMap(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng);
				})
				.error(function(e){
					console.log(e);
				});
}
