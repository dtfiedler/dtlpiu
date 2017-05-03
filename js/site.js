/* 
  site.js
*/

$(document).ready(function() {

	"use strict";
	
	var resultList = $("#resultList");	
	resultList.text("This is from JQuery");
	
	var toggleButton = $("#toggleBtn");

	//Event handler to handle toggle button on click. 
	toggleButton.on("click",function(){
		resultList.toggle(500);


		if(toggleButton.text() == "Hide")
		{
			toggleButton.text("Show") ;
		}
		else
			toggleButton.text("Hide");
	
	});

	/*Network API Calls */

	/*
	In this request, we’re searching for repositories with the word "Mobile"" in the name, the description, or the README. 
	We’re limiting the results to only find repositories where the primary language is javascript. 
	We’re sorting by stars in descending order, so that the most popular repositories appear first in the search results.
	
	details in https://developer.github.com/v3/search/
	*/
	
	/*
	  Use searchForm on submit event handler to process the GET api call
	  when user submit the form by clicking on the submit button. 
	  This can also be accomplished by using the button on clock event of 
	  the submit button on the form.
	 */
	$("#searchForm").on("submit", function() {
		  
		//API default URL incase the user did not specifiy any search pharse
		
		var gitHubSearch = "https://api.github.com/search/repositories?q=Mobile+language:javascript&sort=stars";
		
		//Using the ID selector to query HTML elements in DOM
		//We need the value of users input on searchPharse textbox, 
		//userStarts checkbox, and langChoice dropdown box
		var searchPhrase = $("#searchPhrase").val();
		var useStars = $("#useStars").val();
		var langChoice = $("#langChoice").val();

		//Dynamically assemble the API URL based on the value of user inputs
		if (searchPhrase) {

			resultList.text("Performing search...");

			//The encodeURIComponent() function encodes special characters such as space in the search phrase.
			var gitHubSearch = "https://api.github.com/search/repositories?q=" + encodeURIComponent(searchPhrase);
			
			if (langChoice != "All") {
			gitHubSearch += "+language:" + encodeURIComponent(langChoice);
			}

			if (useStars) {
				gitHubSearch += "&sort=stars";
			}
		}
	    
		//process parameters
		
		//IE broswer will require to make the cross domain value to true 
		jQuery.support.cors = true;
	
		//Make a get API call to get the data
		$.get(gitHubSearch)
		.success(function(r) {
          console.log(r.items.length);
		  displayResults(r.items);
        })
		.fail(function(err) {
          console.log("Failed to query GitHub");
		  //Add custom error message to inform the users.
		  resultList.text("Failed to process your search operation, please contact your IT department.");
        })
		.done(function() {
          console.log("API Call completed");
        });
		
		//the return false statement will override the default submit function of form_on_submit event handler
		return false;
	});
    
	//function to process the array of return data from API
	function displayResults(results) {
    resultList.empty();
    $.each(results, function(i, item) {

      var newResult = $("<div class='result'>" +
        "<div class='title'>" + item.name + "</div>" +
        "<div>Language: " + item.language + "</div>" +
        "<div>Owner: " + item.owner.login + "</div>" +
        "</div>");

	  //Add honver effects of the display result
      newResult.hover(function() {
        // make it darker
        $(this).css("background-color", "lightgray");
      }, function() {
        // reverse
        $(this).css("background-color", "transparent");
      });

      resultList.append(newResult);

    });
  }
	
});





