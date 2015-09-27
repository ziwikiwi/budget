$(document).ready(function() {

	var canvas;
	var ctx;

	var expensesChart;

	init();

	function init() {
		canvas = $("#revenuesChart")[0];
		ctx = canvas.getContext("2d");
		expensesChart = [];
		console.log("initiated");
		readJSON();
	}

	function readJSON() {
		console.log("is this updating");
		var expenses;
		$.getJSON("expenses.json", function(data) {
			console.log("success");
			expenses = data;
		})
		  .done(function( json ) {
		  	makeChart(expenses);
		  })
	}

	function makeChart(data) {
		var numDivisions = Object.keys(data).length;

		var hue = 0;
		var sat = 75;
		var bri = 75;
		var colorVariance = Math.floor((320/numDivisions));

		console.log(data);

		for(var divisionName in data) {
			if(!divisionName.startsWith("TOTAL")) continue;

			var totalCost = 0;

			for(var subdivisionName in data[divisionName]) {
				total += data
			}


		}
	}

	function DataPoint(label, value, color, highlight) {
		this.label = label;
		this.value = value;
		this.color = color;
		this.highlight = highlight;
	}
})