const
    canvas1 = document.getElementById('canvas_editor'),
    trails = document.getElementById('canvas_trail'),
    ctx = canvas1.getContext("2d"),
    trCtx = trails.getContext("2d"),
    PI = Math.PI;


let 
	COUNT = Math.floor(Math.random() * (8 - 3)) + 3;	
	ANGLE = 0,
	SPEED = 0.5,
	ANGLEDIFF = (360/COUNT) * (PI/180); 
	if(window.outerWidth>600){
	    canvas1.style.height = '400px';
	    canvas1.style.width = '600px';
	}
	var CENTER = {
			x: document.getElementById("canvas_editor").offsetWidth / 2,
			y: document.getElementById("canvas_editor").offsetHeight / 2
	}; 
	var R1 = 100;
	if(window.outerWidth<600)
	{
		R1 = 80;
		CENTER = {
			x: document.getElementById("canvas_editor").offsetWidth / 2,
			y: document.getElementById("canvas_editor").offsetHeight / 2
		}; 
	}
	var R2 = R1/2;

function init(){
	/*
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	trCtx.canvas.width = window.innerWidth;
	trCtx.canvas.height = window.innerHeight;
*/
	ctx.canvas.width = document.getElementById("canvas_editor").offsetWidth;
	ctx.canvas.height = document.getElementById("canvas_editor").offsetHeight;
	trCtx.canvas.width = document.getElementById("canvas_editor").offsetWidth;
	trCtx.canvas.height = document.getElementById("canvas_editor").offsetHeight;

	window.requestAnimationFrame(draw);
}

function draw(){
	trCtx.fillStyle = 'rgba(230, 230, 230, 0.1)';
	trCtx.fillRect(0,0, window.innerWidth, window.innerHeight);
	ctx.clearRect(0,0, window.innerWidth, window.innerHeight);

	let COORDS = getAllCoordinates(ANGLE, R1, CENTER);

	ANGLE -= SPEED * PI / 360;

	drawCenter(CENTER, 20);
	drawInnerPoints(COORDS.innerPoints);
	drawOutterPoints(COORDS.outterPoints);
	drawConnectors(COORDS.innerPoints, COORDS.outterPoints);

	//console.log(COORDS);
	window.requestAnimationFrame(draw);
}

window.addEventListener('rezise', () => {
	/*
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	trCtx.canvas.width = window.innerWidth;
	trCtx.canvas.height = window.innerHeight;
	CENTER = {
		x: window.innerWidth / 2,
		y: window.innerHeight / 2
	}; 
	*/
});
//comenzamos
init();

function getAllCoordinates(angle, R, center){
	let coordinates = {
		innerPoints: [],
		outterPoints: []
	}

	let angles = [];

	for(let i=0; i<COUNT; i++){
		let newAngle = ANGLE + ANGLEDIFF * i;
		angles.push(newAngle);
	}

	angles.forEach( (angle, i) => {
		let newPoint = getPointCoordinate(angle, R1, CENTER);
		coordinates.innerPoints.push(newPoint);
	});

	coordinates.innerPoints.forEach( (point, i) => {
		let newAngle = angles[i] * COUNT * 2 + ANGLEDIFF * i;
		let newPoint = getPointCoordinate(newAngle, R2, point);
		coordinates.outterPoints.push(newPoint);
	});
	return coordinates;
}

function getPointCoordinate(angle, R, center){
	let x, y;

	x = center.x + R * Math.cos(angle);
	y = center.y + R * Math.sin(angle);

	return {x,y};
}

function drawCirclePoint(center, radius){
	ctx.fillStyle = '#000';
	ctx.strokeStyle = '#000';
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.arc(center.x, center.y, radius, 0, PI*2, false);
	ctx.stroke();
	ctx.beginPath();
	ctx.ellipse(center.x, center.y, radius-4, radius-4, 0, PI*2, false);
	ctx.fill();
	ctx.stroke();
}

function drawCenter(center, radius){
	drawCirclePoint(center, radius);
	drawCircle(center, R1, true);
}

function drawCircle(center, radius, isBig){
	if(isBig){
		ctx.setLineDash([2,2]);
	}
	ctx.globalAlpha = 0.4;
	ctx.beginPath();
	ctx.strokeStyle = '#000';
	ctx.lineWidth = 2;
	ctx.arc(center.x, center.y, radius, 0, PI*2, false);
	ctx.stroke();
	ctx.globalAlpha = 1;
	ctx.setLineDash([0]);
}

function drawInnerPoints(points){
	points.forEach((point)=>{
		drawCirclePoint(point, 14);
		drawCircle(point, R2, false);
	});
}


function drawOutterPoints(points){
	points.forEach((point)=>{
		drawCirclePoint(point, 8);
		drawPoint(point.x, point.y);
	});
}


function drawConnectors(innerPoints, outterPoints){
	innerPoints.forEach((point, i)=>{
		drawLine(point, CENTER);
		drawLine(point, outterPoints[i]);
	});
}

function drawPoint(x,y){
	trCtx.beginPath();
	trCtx.strokeStyle = '#000';
	trCtx.lineWidth = 1;
	trCtx.arc(x, y, 1, 0, PI*2, false);
	trCtx.stroke();
}

function drawLine(from, to){
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.moveTo(from.x, from.y);
	ctx.lineTo(to.x, to.y);
	ctx.stroke();
}