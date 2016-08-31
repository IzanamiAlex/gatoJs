var game = (function () {
	var game = {};
	game.tablero = [[' ', ' ',' '], [' ', ' ',' '], [' ', ' ',' ']];
	game.turn;
	game.run = false;

	var view;
	var gamers = [];

	game.addGamer = function (gamer) {
		//add gamer
		console.log("addGamer");
		gamers[gamers.length] = gamer;
	};
	game.addView = function (view1) {
		//add view
		view = view1;
	};
	game.start = function () {
		//start the game
		console.log("start");
		game.run =true;
		game.turn = true;
		view.display(game.tablero);
		callGamers(game.turn);
	};
	game.next = function () {
		//next turn
		console.log("next");

		view.display(game.tablero);
		var winner = checkWinner();
		if (winner != null) {
			//displayWinner
			view.displayWinner(winner);
			game.stop();
			return;
		}
		if(checkTie()){
			//displayTie
			view.displayTie();
			game.stop();
			return;
		}

		game.turn = ! game.turn;
		callGamers(game.turn);
	};
	game.stop = function (){
		view.display(game.tablero);
		game.run = false;
	};
	function checkWinner() {
		// check the winner
		console.log("checkWinner");
		var tablero = game.tablero;
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
			var row = Math.floor(i/3);
			var colum = i%3;
			if (game.tablero[row][colum] == ' ') { return false; }
		}
		return true;
	};
	function callGamers(turn) {
		// event change turn
		for (var i = 0; i < gamers.length; i++) {
			gamers[i].onChangeTurn(turn);
		}
	};

	return game;
	}
)();

var gamerPerson = {
	turn : true,
	symbol : 'O'
}
gamerPerson.onChangeTurn = function (turn) {
	console.log('Turno del jugador');
};
gamerPerson.jugada = function (event) {
	console.log(game.turn);
	console.log(gamerPerson.turn);
	if (game.turn === gamerPerson.turn && game.run) {
		console.log("mi jugada");
		console.log(event.target.id);
		var id = event.target.id;
		var row = Math.floor(id/3);
		var colum = id%3;
		if(game.tablero[row][colum] === ' '){
			game.tablero[row][colum] = gamerPerson.symbol;
			game.next();
		}else {
			alert('Seleccion invalida');
		}
	}	
}

//var gamerCompu = new Gamer(false,"X", game);
var gamerCompu = {
	turn : false,
	symbol : 'X',
	onChangeTurn : function (turn) {
		//action when change the turn
		console.log(game.turn);
		console.log(gamerCompu.turn);
		if (gamerCompu.turn === game.turn &&game.run) {
			console.log('turno maquina');
			gamerCompu.jugada();
		}
	}
}
gamerCompu.jugada = function () {
	console.log('jugada maquina');
	var tablero = game.tablero;
	var casillero = checklines(gamerCompu.symbol);
	if (casillero != null) {
		tablero[casillero.row][casillero.colum] = gamerCompu.symbol;
		game.next();
		return;
	}
	casillero = checklines(otherSymbol(gamerCompu.symbol));
	if (casillero != null) {
		tablero[casillero.row][casillero.colum] = gamerCompu.symbol;
		game.next();
		return;
	}
	casillero = findEmpty();
	tablero[casillero.row][casillero.colum] = gamerCompu.symbol;
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
			var row = Math.floor(i/3);
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
					view.buttons[i].innerHTML = tablero[row][col];
				}
			};
			view.displayWinner = function (winner) {
				// display the winner
				alert(winner+' ha ganado');
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