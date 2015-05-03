
// it is necessay to declare these variables outside the
// event listener so that querySelector works properly
var board;
var squares;
var squareBorders;
var reset;
var playerX;
var playerY;
var turn = 'X';
var playCount = 0;

window.addEventListener('load', function () {

  // Grab all the necessary elements
  board = document.querySelector('body');
  squares = document.querySelectorAll('.square p');
  squareBorders = document.querySelectorAll('.square');
  reset = document.querySelector('.reset');
  playerX = document.querySelector('#player_x');
  playerO = document.querySelector('#player_o');

  displayTurn();

  // Listen for clicks on squares
  // Track variable 'turn' for next move and end of game
  // Disallow repeated moves on the same square
  // Disallow moves after the game has been won
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', function(event) {
      if (event.target.innerHTML === '' && turn !== 'game_over') {  // square hasn't been played
        setSquare(event.target);
        checkGameStatus();
      }
      else if (turn === 'game_over') {
        alert("The game is over!  Click 'reset' to play again.");
      }
      else {
        alert('That square has already been played!');
      }
    });
  }

  // Reset the board
  reset.addEventListener('click', function () {
    for (var i = 0; i < squares.length; i++) {
      squares[i].innerHTML = '';
      squares[i].setAttribute('class', 'blank');
      // reset any highlighted winning squares
      squareBorders[i].setAttribute('class', 'square');
      turn = 'X';
      displayTurn();
      playCount = 0;
    }
  });

});

// square is a p element
function setSquare(square) {
  square.innerHTML = turn;  // turn = X or O
  square.setAttribute('class', turn);
  turn === 'X' ? turn = 'O' : turn = 'X';
}

function checkGameStatus() {
  var winner;
  if (winner = getWinner()) {
    gameOver(winner);
  }
  else if (++playCount === 9)
    gameOver('tie');
  // game still going, switch turn
  else displayTurn();
}

function displayTurn() {
  if (turn === 'X' ) {
    playerO.innerHTML = 'Player O ';
    playerX.innerHTML = 'Player X &diams; ';
  }
  else {
    playerO.innerHTML = 'Player O &diams; ';
    playerX.innerHTML = 'Player X ';
  }
}

function gameOver(winner) {
  if (winner === 'tie') {
    alert("Tie!");
  }
  else {
    highlightBorders(winner);
    // winner[0] is 'X' or 'O'
    alert(winner[0] + ' won this round!');
  }
  turn = 'game_over';
  // increment player wins
  // check for hat trick
}

// getWinner will return a win in the form of a string denoting
// the winning player and winning squares, e.g. 'X048'
// if no win, return null
function getWinner() {
  if (winnerIs('X')) {
    return 'X' + winnerIs('X');
  }
  else if (winnerIs('O')) {
    return 'O' + winnerIs('O');
  }
  else
    return null;
}

// If a winning combination of squares exists, return the win
// in the form of a string denoting the winning squares, e.g. '048'
function winnerIs(player) {
  return allThree(player, squareValue('0'), squareValue('1'), squareValue('2')) ||
         allThree(player, squareValue('3'), squareValue('4'), squareValue('5')) ||
         allThree(player, squareValue('6'), squareValue('7'), squareValue('8')) ||
         allThree(player, squareValue('0'), squareValue('3'), squareValue('6')) ||
         allThree(player, squareValue('1'), squareValue('4'), squareValue('7')) ||
         allThree(player, squareValue('2'), squareValue('5'), squareValue('8')) ||
         allThree(player, squareValue('0'), squareValue('4'), squareValue('8')) ||
         allThree(player, squareValue('2'), squareValue('4'), squareValue('6'));
}

function allThree(player, squareOne, squareTwo, squareThree) {
  if ((squareOne[0] === player) && (squareTwo[0] === player) && (squareThree[0] === player))
    return squareOne[1] + squareTwo[1] + squareThree[1];
}

function squareValue(key) {
  switch(key) {
    // we want to persist the data denoting the location of the square on the board,
    // as this will allow us to highlight winning squares in the event of a win
    // example return values are 'X5', '02', '7' (space hasn't been played)
    case '0': return squares[0].innerHTML + '0';
    case '1': return squares[1].innerHTML + '1';
    case '2': return squares[2].innerHTML + '2';
    case '3': return squares[3].innerHTML + '3';
    case '4': return squares[4].innerHTML + '4';
    case '5': return squares[5].innerHTML + '5';
    case '6': return squares[6].innerHTML + '6';
    case '7': return squares[7].innerHTML + '7';
    case '8': return squares[8].innerHTML + '8';
    default : console.log('Something went wrong');
  }
}

// winningSquares is in the form of 'X048'
function highlightBorders(winningSquares) {
  console.log(winningSquares);
  console.log(squareBorders);
  squareBorders[parseInt(winningSquares[1])].setAttribute('class', 'win');
  squareBorders[parseInt(winningSquares[2])].setAttribute('class', 'win');
  squareBorders[parseInt(winningSquares[3])].setAttribute('class', 'win');
}







