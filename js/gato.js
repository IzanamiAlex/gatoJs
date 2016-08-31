var game = (function () {
	var tablero = [[' ', ' ',' '], [' ', ' ',' '], [' ', ' ',' ']];
	var gamers = [];
	var turn;
	var view;
	function addGamer(gamer) {
		//add gamer
		console.log("addGamer");
		gamers[gamers.length] = gamer;
	};
	function addView(view) {
		//add view
	};
	function start() {
		//start the game
		console.log("start");
		turn = true;
		callGamers(turn);
		while(true){
			next();
			checkWinner();
		}
	};
	function next() {
		//next turn
		console.log("next");
		turn = ! turn;
		callGamers(turn);
	};
	function checkWinner() {
		// check the winner or the "empate"	
		console.log("checkWinner");
	};
	function callGamers(turn) {
		// event change turn
		for (var i = gamers.length - 1; i >= 0; i--) {
			gamers[i].onChangeTurn(turn);
		}
	};
	function setPlay(row, colum) {
		// set the tablerov
	}
	function display() {
		//display the game
	};

	return {
			tablero: tablero,
			turn : turn,
			addGamer : addGamer,
			addView: addView,
			start : start,
			next : next,
			setPlay : setPlay
		};
	}
)();

function Gamer(turn,symbol,game) {
	Gamer.turn = turn;
	Gamer.symbol = symbol;
	Gamer.game = game;
	Gamer.onChangeTurn = function (turn) {
		//action when change the turn
		if (turn === Gamer.turn) {
			Gamer.jugada();
		}
	};
	Gamer.jugada = null;
}

var gamerPerson = new Gamer(true,"O",game);
gamerPerson.jugada = function () {
	for (var i = 0; i < 9; i++) {
		var button = Document.getElementById(i);
		button.addListener('click', function () {
			
		})
	}
	
}
