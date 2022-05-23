var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;

let right_key = 39;
let up_key = 38;
let down_key = 40;
let left_key = 37;

let number_of_balls =50;
let counter_of_falling_balls = 0;
let ball5_color = "#FF0000";
let ball15_color = "#00FF00";
let ball25_color = "#0000FF";
let ball5 = 30;
let ball15 = 15;
let ball25 = 5;
let timer = 60;
let num_of_monsters = 1;
let life = 5;
/*
$(document).ready(function() {
	context = canvas.getContext("2d");
	StartGame();
});
*/
var refreshRate = 4.0;

div_array = ["#welcome", "#register","#login","#about","#full_game", "#game_setting"  ]
function menu_button_clicked(x) {
	let i = 0;
	div_array.forEach(div => {i++==x ? $(div).show() : $(div).hide();});
	if(x != 3 ){
		stopGame();
	}
	if (x==4){
		StartGame();
	}
}

function createSuffleArray( b1, b2, b3){
	var array = []
	var i = 0;

	for (var j = 0; j < b1; j++) {
		array[i++] = 100;
	}
	for (var j = 0; j < b2; j++) {
		array[i++] = 101;
	}
	for (var j = 0; j < b3; j++) {
		array[i++] = 102;
	}	
	return array.sort((a, b) => 0.5 - Math.random())

}

var audio = new Audio('./resources/music_sound.mp3');//music now
function StartGame() {
	counter_of_falling_balls = 0;
	audio.play();
	context = canvas.getContext("2d");
	board = new Array();
	score = 0;
	setLife(5);
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = number_of_balls;//22.5.2022
	var pacman_remain = 1;
	start_time = new Date();
	var array = createSuffleArray(ball5, ball15, ball25);
	//22.5.2022
	var ball_counter = 0;
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
					if (food_remain >= 0){
						board[i][j] = array[ball_counter++];
					}
					//22.5.2022
				}
				else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
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
		board[emptyCell[0]][emptyCell[1]] = 100;
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
	initialMonsters(num_of_monsters);
	initialBonusPoints();
	interval = setInterval(UpdatePosition, 250);
}

function stopGame(){
	window.clearInterval(interval);
	audio.pause();
	audio.currentTime = 0;
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
//all the importent arguments screened in the game
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
	color1display.value = ball5_color;
	$('#color1display').show();
}
function setBall30(c){
	ball15_color = c;
	color2display.value = ball15_color;
	$('#color2display').show();
}
function setBall10(c){
	ball25_color = c;
	color3display.value = ball25_color;
	$('#color3display').show();
}
//sets the time game
function setTimeGame(t){
	timer = t;
}
function setMonsters(n){
	num_of_monsters = n;
}
function setLife(m){
	lifelbl.value = m;
	life = m;
}
function musicStop(){////////need to fill
	return true;
}
function musicStart(){////////need to fill
	return true;
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
//packman Class
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
//Class Ball
class Ball {
	constructor(color, points, radious) {
	  this.color = color;
	  this.points = points;
	  this.radious = radious;
	}
  }
var ball_dict = {}

//Draw 
function Draw(direction) {
	canvas.width = canvas.width; //clean board
	ball_dict = {
		100: new Ball(ball5_color, 5, 10 ),
		101: new Ball(ball15_color, 15, 12 ),
		102: new Ball(ball25_color, 25, 15 )
	}
	lblScore.value = score;
	lblTime.value = time_elapsed - (time_elapsed % 1) ;
	var tergetX, TargetY;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2){
				targetX = i;
				targetY = j;
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
			} else if (board[i][j] == 100 || board[i][j] == 101 || board[i][j] == 102) {
				var ball = ball_dict[board[i][j]];
				context.beginPath();
				context.arc(center.x, center.y, ball.radious, 0, 2 * Math.PI); // circle
				context.fillStyle = ball.color; //color
				context.fill();
				context.fillStyle = "black";
				context.fillText(''+ball.points, center.x-3, center.y+3, 20)
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
	moveMonsters(targetX, targetY);
	moveBunusPoints();
	drawMonsters(context);
	drawBonusPoints(context);
}

var lastPressed = 4
function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	checkBonusPoints(shape.i, shape.j);
	if (checkMonsters(shape.i, shape.j)){
		lblScore.value = score;
		stopGame();
		window.alert("Loser!");
		return;
	}
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
	if (board[shape.i][shape.j] == 100 || board[shape.i][shape.j] == 101 || board[shape.i][shape.j] == 102) {
		score += ball_dict[board[shape.i][shape.j]].points;
		counter_of_falling_balls++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	
	if (score >= 50 && time_elapsed <= 10 /*10*/) {
		pac_color = "green";
	}
	if(timer <= time_elapsed){
		if(score < 100 ){
			stopGame();
			window.alert("You are better than " + score + " points!");
		}
		else{
			stopGame();
			window.alert("Winner!!!");
		}
	}
	if (counter_of_falling_balls >= number_of_balls){
		counter_of_falling_balls = 0;
		stopGame();
		window.alert("Winner!!!");
	}
	else {
		Draw(lastPressed);
	}
}

class Monster {
	constructor(className, startX, startY, speed, points) {
	  this.className = className;
	  this.currentX = startX;
	  this.currentY = startY;
	  this.speed = speed;
	  this.points = points;
	  this.tickCounter = 0;
	  this.active = true;
	  this.ticksBeteenMove = refreshRate * (1/speed);
	}
  }

var monsters = [];

function initialMonsters(num){
	var counter = 0;  
	var a = [];
	avtiveMonsters = num;

	a[0] = [0,0];
	a[1] = [0,9];
	a[2] = [9,9];
	a[3] = [9,0];

	var superMonster = false;
	var m;
	while (counter<num){
		var r = Math.floor(Math.random() * 4)
		if (a[r]!=false){
			if (!superMonster){
				superMonster = true;
				m = new Monster("ghost.png", a[r][0],a[r][1], 0.5, 20);
			} else {
				m = new Monster("scaredGhost.png", a[r][0],a[r][1], 0.5, 10);
			}
			a[r] = false;
			monsters[counter]= m;
			counter +=1;
		}
	}
}

	function drawMonsters(context){
		monsters.forEach(monster => {
			if (monster.active){
				var sprite = new Image();
				sprite.src = "resources/"+monster.className;
				context.drawImage(sprite, monster.currentX*60, monster.currentY*60,
					sprite.width*2 , sprite.height*2);
			}
	 	 })
	}
	var avtiveMonsters;
	//lifelbl.value = life;
	function checkMonsters(x, y){
		setLife(life);
		monsters.forEach(monster => {
			if (monster.active && monster.currentX==x && monster.currentY == y){
				monster.active = false;
				avtiveMonsters -=1;
				life--;
				setLife(life);
				score -= monster.points;
			}
	 	 })
		if (avtiveMonsters==0){
			initialMonsters(num_of_monsters);
		}
		return life == 0;
	}


	function monsterMove(monster, dx, dy){
		if (board[monster.currentX+dx][monster.currentY+dy]!=4){
			monster.currentX = monster.currentX+dx;
			monster.currentY = monster.currentY+dy;
		} else {
			monsterMove(monster, dy,dx);
		}
	}

	function moveMonsters(targetX, targetY){
		monsters.forEach(monster => {
			monster.tickCounter +=1;
			if (monster.tickCounter % monster.ticksBeteenMove == 0){
				monster.tickCounter = 0;
				var dx = targetX - monster.currentX;
				if (dx!=0)	{	dx = dx / Math.abs(dx);}
				var dy = targetY - monster.currentY;
				if (dy!=0)	{	dy = dy / Math.abs(dy);}

				if (dx==0){
					monsterMove(monster, 0, dy);
				} else if (dy==0){
					monsterMove(monster, dx, 0);
				} else {
					var r = Math.floor(Math.random() * 2)
					if (r==1){
						monsterMove(monster, dx, 0);
					} else 
						monsterMove(monster, 0, dy);
					} 
				}
	 	 })
	}

	class BonusPoints {
		constructor(className, startX, startY, speed, points) {
		  this.className = className;
		  this.currentX = startX;
		  this.currentY = startY;
		  this.points = points;
		  this.tickCounter = 0;
		  this.active = true;
		  this.ticksBeteenMove = refreshRate * (1/speed);
		}
	}

	var bonus;
	var bonusMove = [];
	bonusMove[0] = [1,0];
	bonusMove[1] = [-1,0];
	bonusMove[2] = [0,1];
	bonusMove[3] = [0,-1];

	function initialBonusPoints(){
		bonus = new BonusPoints("speed50.png", 5, 5, 0.5, 50)
	}

	function drawBonusPoints(context){
		if (bonus.active){
			var sprite = new Image();
			sprite.src = "resources/"+bonus.className;
			context.drawImage(sprite, bonus.currentX*60, bonus.currentY*60,
			sprite.width*2 , sprite.height*2);
		}
	}

	function moveBunusPoints(){
			bonus.tickCounter +=1;
			if (bonus.tickCounter % bonus.ticksBeteenMove == 0){
				bonus.tickCounter = 0;
				var r = Math.floor(Math.random() * 4)
				var newX = bonus.currentX + bonusMove[r][0];
				var newY = bonus.currentY + bonusMove[r][1];
				if (newX>=0 && newX <=9 && newY >=0 && newY <=9 ){
					bonus.currentX =newX;
					bonus.currentY = newY;
				}
			}
	}

	function checkBonusPoints(x, y){
		if (bonus.active && bonus.currentX==x && bonus.currentY == y){
			bonus.active = false;
			score += bonus.points;
		}
	}