
'use strict';

window.onload = function() {
	var submit = document.getElementById('submit');
	var prediction = document.getElementById('prediction');
	var clear = document.getElementById('clear');
	var accuracy = document.getElementById('accuracy');
	var learnmore = document.getElementById('learnmore');
	var container = document.getElementById('container');
	var moreinfo = document.getElementById('moreinfo');
	var smallCanvas = document.getElementById('smallCanvas');
	var learnmoreSwitch = true;

	resetprediction();

	submit.addEventListener('click', function() {
		// Flatten image (28x28 -> 784)
		var x = canvasToFlatImg();
		var result = predictor(x);
		var text = "That's a " + result + "!";
		if (result === -1) {
			text = "Hmm... Try again";
		}
		prediction.innerHTML = text;
	});

	clear.addEventListener('click', function() {
		erase();
		var newCtx = smallCanvas.getContext("2d");
		newCtx.clearRect(0, 0, w, h);
		// $('#accuracy').empty();
		resetprediction();
	});

	learnmore.addEventListener('click', function() {
		if (learnmoreSwitch) {
			container.style.display = 'none';
			moreinfo.style.display = 'block';
			learnmore.innerHTML = 'back';
			learnmoreSwitch = false
		} else {
			container.style.display = 'block';
			moreinfo.style.display = 'none';
			learnmore.innerHTML = 'learn more';
			learnmoreSwitch = true
		}
	});

	init();
}


/* ----------------- functions ------------------ */

function resetprediction() {
	prediction.innerHTML = "Draw a number from 0 to 9";
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
		// text = text + "<br>" + "<b>" + i + "</b>" + ": " + Math.round(arr[i]*1000)/10 + "%";
		if (arr[i] > count) {
			count = arr[i];
			num = i;
		}
	}
	if (count < 0.5) {
		num = -1;
	} else {
		// $('#accuracy').html(text);
	}
	return num;
}

// Regression classifier
function predictor(x) {
	var y = softmax(math.add(math.multiply(math.transpose(softmaxreg.W), x), softmaxreg.b));
	return argmax(y);
}

function canvasToFlatImg() {
		var newCtx = smallCanvas.getContext("2d");
		newCtx.drawImage(canvas, 0, 0, 280, 280, 0, 0, 28, 28);

	  // one-dimensional array containing the data in the RGBA order
    var imageData = newCtx.getImageData(0, 0, 28, 28).data;
    var result = [];
    // extract the alpha (ignore RGB)
    for (var i=3; i<imageData.length; i+=4) {
    	result[(i+1)/4 - 1] = imageData[i] / 255;
    }
    return result;
}
