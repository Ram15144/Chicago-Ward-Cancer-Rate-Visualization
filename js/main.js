
var App = App || {};

(function() {
	App.start = function()
	{
		console.log("I'm here!");
		App.map_view = new map_view();
		App.comm_area_boundaries = new ca_boundaries();
		App.scatterPlot; // initialized in map_view.js
	}
	App.update_map = function()
	{
		App.map_view.updateMap();
	}
	App.toggle_switch = function()
	{
		App.map_view.toggle();
	}
	App.ca_map = function()
	{
		let checkBox = document.getElementById("fancy-checkbox-default");
		if(checkBox.checked == true)
		{	
			document.getElementById("rangeSlider").style.visibility = "visible";
		}
		else
		{
			document.getElementById("rangeSlider").style.visibility = "hidden";
		}
		App.comm_area_boundaries.activation();
	}
	
}) ();