var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;

$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				//pizur kadurim
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}
//////////////////////////////////////////////////////////////all the importent arguments screened in the game
let right_key = 39;
let up_key = 38;
let down_key = 40;
let left_key = 37;

let number_of_balls ='';
let ball5_color = "#FF0000";
let ball15_color = "#00FF00";
let ball25_color = "#0000FF";
let ball5 = 30;
let ball15 = 15;
let ball25 = 5;
let timer = 60;
let num_of_monsters = 1;

function setKeyRight(val){
	right_key = val;
}
function setKeyLeft(val){
	left_key = val;
}
function setKeyUp(val){
	up_key = val;
}
function setKeyDown(val){
	down_key = val;
}
function setBallsNumber(n){
	number_of_balls = n;
	setBallsPercentage(n);
}
function setBallsPercentage(n){
	ball5 = n * 0.6 - (n * 0.6 % 1);
	ball15 = n * 0.3 - (n * 0.3 % 1);
	ball25 = n * 0.1 - (n * 0.1 % 1);
	var x = n - (ball5 + ball15 + ball25);
	ball5 += x;
}
function setBall60(c){
	ball5_color = c;
}
function setBall30(c){
	ball15_color = c;
}
function setBall10(c){
	ball25_color = c;
}
//sets the time game
function setTimeGame(t){
	timer = t;
}
function setMonsters(n){
	num_of_monsters = n;
}

//balagan bamisparim
function GetKeyPressed() {
	if (keysDown[up_key]) {
		return 1;
	}
	if (keysDown[down_key]) {
		return 2;
	}
	if (keysDown[left_key]) {
		return 3;
	}
	if (keysDown[right_key]) {
		return 4;
	}
	return 0;
}
////////////////////////////////////////
function packmanArgs(dir){
	var args = new Object();
	switch(dir){
		case 1:
			args.ang1 = 1.65;
			args.ang2 = 3.35;
			args.dx = 15;
			args.dy = 5;
			break;
		case 2:
			args.ang1 = 0.65;
			args.ang2 = 2.35;
			args.dx = 15;
			args.dy = -5;
			break;
		case 3:
			args.ang1 = 1.15;
			args.ang2 = 2.85;
			args.dx = -5;
			args.dy = -15;
			break;
		default:
			args.ang1 = 0.15;
			args.ang2 = 1.85;
			args.dx = 5;
			args.dy = -15;
			break;												
	}
	return args;
}


function Draw(direction) {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2){
				var args = packmanArgs(direction);
				context.beginPath();
				context.arc(center.x, center.y, 30, args.ang1 * Math.PI, args.ang2 * Math.PI); // half circle   //down
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + args.dx, center.y + args.dy, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}
var lastPressed = 4
function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x != 0){
		lastPressed = x;
	}
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		//
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw(lastPressed);
	}
}
