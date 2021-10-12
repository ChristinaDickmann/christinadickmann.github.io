// JavaScript source code
angle = 0;
catCounter = 0;
rotating = false;
catRotating = false;
var turnDiscConstantly = setInterval(changeSourceContinuous, 100);
var turnCatConstantly = setInterval(changeCatSourceContinous, 200);


window.onkeydown = function(evt){
	var key = evt.which ? evt.which : evt.keyCode;
	var c = String.fromCharCode(key);
	switch (c) {
		case ('L'):
			angle -= 45;
			if (angle < 0)
				angle += 360;
			changeSource(angle);
			break;
		case ('R'):
			angle += 45;
			if (angle >= 360)
				angle -= 360;
			changeSource(angle);
			break;
		case ('A'):
			rotating = !rotating;
			break;
		case ('C'):
			catRotating = !catRotating;
			break;
	}
};

function loadImage(filename) {
	var imageObj = new Image();
	imageObj.src = "images/" + filename;
	imageObj.onload = function() {
		var img = document.getElementById('scheibe');
		img.setAttribute('src', this.src);
	};
};

function changeSource(angle) {
	var img = document.getElementById('scheibe');
	img.setAttribute('src', "images/schallplatte" + angle + ".png");
};

function changeSourceContinuous(){
	if (rotating) {
		angle += 45;
		if (angle >= 360)
			angle -= 360;
		changeSource(angle);
	};
};

function changeCatSource(state) {
	var img = document.getElementById('katze');
	img.setAttribute('src', "images/cat" + state + ".png");
};

function changeCatSourceContinous(){
	if (catRotating) {
		catCounter += 1;
		if (catCounter == 4)
			catCounter = 0;
		changeCatSource(catCounter);
	}
}