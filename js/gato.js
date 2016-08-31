var game = (function () {
	var tablero = [[' ', ' ',' '], [' ', ' ',' '], [' ', ' ',' ']];
	var turn = 'x';
	function addGamer(gamer) {
		//add gamer
		console.log("addGamer");
	};
	function start() {
		//start the game
		console.log("start");
	};
	function next() {
		//next turn
		console.log("next");
	};
	function checkWinner() {
		// check the winner or the "empate"	
		console.log("checkWinner");
	};
	return {
			turn : turn,
			addGamer : addGamer,
			start : start,
			next : next
		};
	}
)();



function corre(){
	console.log(game.turn);
	game.addGamer();
	game.start();
	game.next();
};