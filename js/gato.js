var game = (function () {
	var tablero = [['_', '_','_'], ['_', '_','_'], ['_', '_','_']];
	var gamers = [];
	var turn;
	var view;
	function addGamer(gamer) {
		//add gamer
		console.log("addGamer");
		gamers[gamers.length] = gamer;
	};
	function addView(view1) {
		//add view
		view = view1;
	};
	function start() {
		//start the game
		console.log("start");
		turn = true;
		view.display(tablero);
		callGamers(turn);
	};
	function next() {
		//next turn
		console.log("next");

		view.display(tablero);
		var winner = checkWinner();
		if (winner != null) {
			//displayWinner
		}
		if(checkTie()){
			//displayTie
			view.displayTie();
		}

		turn = ! turn;
		callGamers(turn);
	};
	function checkWinner() {
		// check the winner
		console.log("checkWinner");
		for (var row = 0; row < tablero.length; row++) {
			if (tablero[row][0] === tablero[row][1] && 
				tablero[row][1] === tablero[row][2] &&
				tablero[row][0] != ' ') {
				return tablero[row][0];
			}
		}
		for (var colum = 0; colum < tablero[0].length; colum++) {
			if (tablero[0][colum] === tablero[1][colum] && 
				tablero[1][colum] === tablero[2][colum] &&
				tablero[0][colum] != ' ') {
				return tablero[0][colum];
			}
		}
		if (tablero[0][0] === tablero[1][1] &&
			tablero[1][1] === tablero[2][2] &&
			tablero[1][1] != ' ') {
			return tablero[1][1];
		}
		if (tablero[0][2] === tablero[1][1] &&
			tablero[1][1] === tablero[2][0] &&
			tablero[1][1] != ' ') {
			return tablero[1][1];
		}
		return null;
	};
	function checkTie() {
		for (var i = 0; i < 9; i++) {
			var row = i/3;
			var colum = i%3;
			if (tablero[row][colum] == ' ') { return false }
		}
		return true;
	};
	function callGamers(turn) {
		// event change turn
		for (var i = 0; i < gamers.length; i++) {
			console.log(i);
			console.log(turn);
			console.log(gamers[i].symbol);
			console.log(typeof gamers[i].onChangeTurn);
			gamers[i].onChangeTurn(turn);
		}
	};

	return {
			tablero: tablero,
			turn : turn,
			addGamer : addGamer,
			addView: addView,
			start : start,
			next : next,
		};
	}
)();

// function Gamer(turn,symbol,game) {
// 	Gamer.turn = turn;
// 	Gamer.symbol = symbol;
// 	Gamer.game = game;
// 	Gamer.onChangeTurn = function (turn) {
// 		//action when change the turn
// 		if (Gamer.turn === Gamer.game.turn) {
// 			Gamer.jugada();
// 		}
// 	};
// 	Gamer.jugada = null;
// }

//var gamerPerson = new Gamer(true,"O",game);
var gamerPerson = {
	turn : true,
	symbol : 'O'
}
gamerPerson.onChangeTurn = function (turn) {
	console.log('Turno del jugador');
};
gamerPerson.jugada = function (event) {
	console.log(gamerPerson.game.turn);
	console.log(gamerPerson.turn);
	if (game.turn === gamerPerson.turn) {
		console.log("mi Turno");
		//TODO: verificar como cambiar el texto de un button
		console.log(event.target.id);
		if(event.target.innerHTML === ' '){
			event.target.innerHTML = symbol;
			game.next();
		}
	}	
}

//var gamerCompu = new Gamer(false,"X", game);
var gamerCompu = {
	turn : false,
	symbol : 'X',
	game : game,
	onChangeTurn : function (turn) {
		//action when change the turn
		if (gamerCompu.turn === gamerCompu.game.turn) {
			Gamer.jugada();
		}
	}
}
gamerCompu.jugada = function () {
	var tablero = game.tablero;
	var casillero = checklines(symbol);
	if (casillero != null) {
		tablero[casillero.row][casillero.colum] = symbol;
		return;
	}
	casillero = checklines(otherSymbol(symbol));
	if (casillero != null) {
		tablero[casillero.row][casillero.colum] = symbol;
		return;
	}
	casillero = findEmpty();
	tablero[casillero.row][casillero.colum] = symbol;

	game.next();
	
	function checklines(symbol) {
		for (var row = 0; row < tablero.length; row++) {
			if(tablero[row][0] === tablero[row][1] && 
				tablero[row][0] === symbol && 
				tablero[row][2] === ' ') {
					return{ row : row, colum : 2};
			}
			if(tablero[row][1] === tablero[row][2] && 
				tablero[row][1] === symbol && 
				tablero[row][0] === ' ') {
					return{ row : row, colum : 0};
			}
			if(tablero[row][0] === tablero[row][2] && 
				tablero[row][0] === symbol && 
				tablero[row][1] === ' ') {
					return{ row : row, colum : 1};
			}
		}

		for (var colum = 0; colum < tablero[0].length; colum++) {
			if(tablero[0][colum] === tablero[1][colum] && 
				tablero[0][colum] === symbol && 
				tablero[2][colum] === ' ') {
					return{ row : 2, colum : colum};
			}
			if(tablero[1][colum] === tablero[2][colum] && 
				tablero[1][colum] === symbol && 
				tablero[0][colum] === ' ') {
					return{ row : 0, colum : colum};
			}
			if(tablero[0][colum] === tablero[2][colum] &&
				tablero[0][colum] === symbol && 
				tablero[1][colum] === ' ') {
					return{ row : 1, colum : colum};
			}
		}
		if (tablero[1][1] === tablero[2][2] &&
			tablero[1][1] === symbol &&
			tablero[0][0] === ' ') {
				return {row : 0, colum : 0};
		}
		if (tablero[0][0] === tablero[2][2] &&
			tablero[0][0] === symbol &&
			tablero[1][1] === ' ') {
				return {row : 1, colum : 1};
		}
		if (tablero[0][0] === tablero[1][1] &&
			tablero[0][0] === symbol &&
			tablero[2][2] === ' ') {
				return {row : 2, colum : 2};
		}
		if (tablero[0][2] === tablero[1][1] &&
			tablero[1][1] === symbol &&
			tablero[2][0] === ' ') {
				return {row : 2, colum : 0};
		}
		if (tablero[2][0] === tablero[1][1] &&
			tablero[1][1] === symbol &&
			tablero[0][2] === ' ') {
				return {row : 0, colum : 2};
		}
		if (tablero[2][0] === tablero[0][2] &&
			tablero[2][0] === symbol &&
			tablero[1][1] === ' ') {
				return {row : 1, colum : 1};
		}

		return null;
	}

	function findEmpty() {
		//find position uncheked
		for (var i = 0; i < 9; i++) {
			var row = i/3;
			var colum = i%3;
			if (tablero[row][colum] === ' ') { return {row : row, colum : colum} }
		}
		return null;
	}

	function otherSymbol(symbol) {
		//return the other symbol
		if (symbol === 'O') { return 'X' } 
		else if ( symbol === 'X' ) {return 'O'} 
		else return null;
	}
}

var view = (function () {
			//view
			var view = {};
			view.buttons = [];
			view.buttons = document.getElementsByTagName('button');
			console.log(view.buttons.length);
			for (var i = 0; i < view.buttons.length; i++) {
				view.buttons[i].addEventListener('click',gamerPerson.jugada);
			}
			view.display = function (tablero) {
				// display the tablero
				for (var i = 0; i < 9; i++) {
					var row = Math.floor(i/3);
					var col = i%3;
					//TODO: verificar como cambiar el texto de un button
					view.buttons[i].innerHTML = tablero[row][col];
				}
			};
			view.displayWinner = function () {
				// display the winner
			}
			view.displayTie = function () {
				//display the Tie
				alert("Se ha empatado");
			}
			return view;
		}
	)();



game.addGamer(gamerPerson);
game.addGamer(gamerCompu);
game.addView(view);
game.start();