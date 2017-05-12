
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
/*
  site.js
*/
