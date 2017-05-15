
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
	 getWeather();
}

var search = function () {
	if (isValid()){
		getGeoCoding();
		$("#zip_input").removeClass("error");
		$("#error").remove();
	} else {
		console.log('error');
		$("#zip_input").addClass("error");
		$("#error").remove();
		$("#btn").before("<div id='error'>Please enter a valid 5 digit zip code</div>");
	}
}

var isValid = function () {
	var zip = document.getElementById('zip_input').value;
	if (!isNaN(zip)){
		if (zip.length === 5){
			return true;
		}
		else {
			return false
		}

} else {
	return false;
}

}

var getWeather = function () {
    var zip = document.getElementById('zip_input').value;
    console.log("getting weather information");
    $.ajax({
           type: 'GET',
           crossOrigin: true,
           contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
           url: "https://query.yahooapis.com/v1/public/yql?q=select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + zip + "')&format=json&callback=callbackFunction"
        }).done(function(data){
						console.log("successfully retrieved weather");
	            // Center the map at the requested zip code.
	           document.getElementById('weather_div').innerText = data.responseText;
        })
        .error(function(e){
						console.log(e);
						// For some reason AJAX considers the return an error, although in some cases we receive a valid JSON response.
						var newString = JSON.parse(e.responseText.split("callbackFunction(")[1].split(")")[0]);
						if (newString.query.results) {
							console.log("successfully retrieved weather");

						                document.getElementById('weather_div').innerText = "Date: " +  newString.query.results.channel.item.condition.date + " Weather: " + newString.query.results.channel.item.condition.text + " Temp: " + newString.query.results.channel.item.condition.temp;
						} else {
						                document.getElementById('weather_div').innerText = "Null Result: Yahoo API Returning no weather currently";
						}
        });
}

var validateContactForm = function (){

		var email = $('#email').val();
		console.log(email);

		var re = /^(([^<>()[\]{}'^?\\.,!|//#%*-+=&;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		if (email.length > 3 && re.test(email)){
				console.log("valid email");
				$("#contactError").hide();
				$('#email').removeClass('error');

				var comment = $('#Comments').val();
				var name = $('#name').val();

				console.log(comment);
				if (comment.length >= 3 && name.length >= 3){
					console.log('success');
					$('#contactUsForm').hide();
					$('#message').show();
				}
		} else {
			console.log("invalid email");
			$("#contactError").show();
			$('#email').addClass('error');
		}
}
