
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

var getGeoCoding = function (zip) {
	$.ajax({
           type: 'GET',
           contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
           url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + zip + '&key=AIzaSyDlXmT_QhVJ9uaXhekOtOTb5zSABTMDW5k'
          //  url: 'http://localhost:5000/getDataPostgres'
				}).done(function(data){
					console.log("data is --> ", data);
				});
}
/*
  site.js
*/
