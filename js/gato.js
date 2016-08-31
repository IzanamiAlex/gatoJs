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
			turn : turn,
			addGamer : addGamer,
			addView: addView,
			start : start,
			next : next,
			setPlay : setPlay
		};
	}
)();


