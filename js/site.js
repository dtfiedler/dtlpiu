
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

var getWeather = function () {
    var zip = document.getElementById('zip_input').value;
    console.log("zip is --> " + zip);
    $.ajax({
           type: 'GET',
                                                                                crossOrigin: true,
           contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
           url: "https://query.yahooapis.com/v1/public/yql?q=select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + zip + "')&format=json&callback=callbackFunction"
        }).done(function(data){
                        // Center the map at the requested zip code.
                        document.getElementById('weather_div').innerText = data.responseText;
        })
        .error(function(e){
                        // For some reason AJAX considers the return an error, although in some cases we receive a valid JSON response.
                        var newString = JSON.parse(e.responseText.split("callbackFunction(")[1].split(")")[0]);
                        if (newString.query.results) {
                                        document.getElementById('weather_div').innerText = "Date: " +  newString.query.results.channel.item.condition.date + " Weather: " + newString.query.results.channel.item.condition.text + " Temp: " + newString.query.results.channel.item.condition.temp;
                        } else {
                                        document.getElementById('weather_div').innerText = "Null Result: Yahoo API Returning no weather currently";
                        }
        });
}
