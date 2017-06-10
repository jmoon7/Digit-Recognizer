
'use strict';

// idea: use putImageData to, after classifying the written digit, erase the canvas
// and display a well written version of that number; autofix your handwriting.

/* ------------------------------------------ */

$(document).ready(function() {
	resetprediction();	

	$('#submit').click(function() {
		// Flatten image (28x28 -> 784)
		var x = canvasToFlatImg();
		var result = predictor(x);
		var text = "That's a " + result + "!";
		if (result === -1) {
			text = "Hmm... Try again";
		}
		$('#prediction').text(text);
	});

	$('#clear').click(function() {
		erase();
		$('#accuracy').empty();
		resetprediction();
	});

	init();
});


/* ----------------- functions ------------------ */

function resetprediction() {
	$('#prediction').text("Draw a number from 0 to 9");	
}

// Softmax function
function softmax(arr) {
	arr = math.exp(arr);
	var sum = math.sum(arr);
	for (var i = 0; i<arr.length; i++) {
		arr[i] = arr[i] / sum;
	}
	return arr;
}

function argmax(arr) {
	var num = 0;
	var count = 0;
	var text = "";
	// argmax
	for (var i = 0; i<10; i++) {
		text = text + "<br>" + "<b>" + i + "</b>" + ": " + Math.round(arr[i]*1000)/10 + "%";
		if (arr[i] > count) {
			count = arr[i];
			num = i;
		}
	}
	if (count < 0.5) {
		num = -1;
	} else {
		$('#accuracy').html(text);
	}
	return num;
}

// Regression classifier
function predictor(x) {
	var y = softmax(math.add(math.multiply(math.transpose(softmaxreg.W), x), softmaxreg.b));
	return argmax(y);
};

function canvasToFlatImg() {
    var imageData = ctx.getImageData(0, 0, 28, 28).data;
    var result = [];
    for (var i=3; i<imageData.length; i+=4) {
    	result[(i+1)/4 - 1] = imageData[i] / 255;
    }
    return result;
};

