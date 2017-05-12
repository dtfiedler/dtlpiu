/*
	contact.js
 */

$(document).ready(function() {

	"use strict";
	//define constant
	var phonepattern = /[0-9]{3}[0-9]{3}[0-9]{4}/;
	var emailpattern = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;


	//Based on the selected value of best time to contact, show or hide different input tag
	$("#bestContactMethod").on("change", function() {
		var bestTimeToContactValue = $("#bestContactMethod").val();

		if (bestTimeToContactValue == "cellPhone") {
			//use jquery to change the display setting of an html tag
			$("#cellPhoneDiv").css("display","block");
			$("#workPhoneDiv").css("display","none");
			$("#emailDiv").css("display","none");
			$("#imDiv").css("display","none");
		} else if(bestTimeToContactValue == "workPhone") {
			$("#cellPhoneDiv").css("display","none");
			$("#workPhoneDiv").css("display","block");
			$("#emailDiv").css("display","none");
			$("#imDiv").css("display","none");
		} else if (bestTimeToContactValue == "email") {
			$("#cellPhoneDiv").css("display","none");
			$("#workPhoneDiv").css("display","none");
			$("#emailDiv").css("display","block");
			$("#imDiv").css("display","none");
		} else if (bestTimeToContactValue == "im") {
			$("#cellPhoneDiv").css("display","none");
			$("#workPhoneDiv").css("display","none");
			$("#emailDiv").css("display","none");
			$("#imDiv").css("display","block");
		} else	{
			console.log("bestContactMethod selection out of bound.");
		}
	});


	//Set up handler when the mouse is off a input field and loses focus
	//Work Phone Validation
    $('#workPhoneNumber').on('blur', function() {
        //alert('Handler for .blur() called.');
		var workPhone = $("#workPhoneNumber").val();
		var validateMsg = $("#validateMsg");

		//if nothing entered, set the error message div to visible, and the text within the div
		if(workPhone == "") {
			validateMsg.css("display","block");
			validateMsg.text("Please provide a work phone number.");
			return false;
		}

		//if the format is wrong, set the error message div to visible, and the text within the div
		if(!phonepattern.test(workPhone)) {
			validateMsg.css("display","block");
			validateMsg.text("Please provide a work phone number in XXXXXXXXXX format.");
			return false;
		}

		//if pass validateion, hide the validation message div
		validateMsg.css("display","none");

		return true;

    });

	//Cell Phone Validation
    $('#cellPhoneNumber').on('blur', function() {
        //alert('Handler for .blur() called.');
		var cellPhone = $("#cellPhoneNumber").val();
		var validateMsg = $("#validateMsg");
		if(cellPhone == "") {
			validateMsg.css("display","block");
			validateMsg.text("Please provide a cell phone number.");
			return false;
		}

		if(!phonepattern.test(cellPhone)) {
			validateMsg.css("display","block");
			validateMsg.text("Please provide a cell phone number in XXXXXXXXXX format.");
			return false;
		}

		validateMsg.css("display","none");

		return true;

    });

	//Instant Messenger Validation
    $('#im').on('blur', function() {
        //alert('Handler for .blur() called.');
		var im = $("#im").val();
		var validateMsg = $("#validateMsg");
		if(im == "") {
			validateMsg.css("display","block");
			validateMsg.text("Please provide a Instant Messenger.");
			return false;
		}

		validateMsg.css("display","none");

		return true;

    });

	//Email Validation
    $('#email').on('blur', function() {
        //alert('Handler for .blur() called.');
		var email = $("#email").val();
		var validateMsg = $("#validateMsg");
		if(email == "") {
			validateMsg.css("display","block");
			validateMsg.text("Please provide an Email.");
			return false;
		}

		if(!emailpattern.test(email)) {
			validateMsg.css("display","block");
			validateMsg.text("Please provide an email in XXX@XXX.XXX format.");
			return false;
		}

		validateMsg.css("display","none");

		return true;

    });

});//end ready
