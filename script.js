const gameboard = (function() {

  const rows = 3;
  const columns = 3;
  let board = [];
  for (i = 0; i < columns; i++) {
    board[i] = [];
    for (let j = 0; j < rows; j++) {
      board[i].push(null);  
    };
  };

  const getBoard = () => board;

  const upDateCell = (player, column, row) => {
    if (board[column][row] == null) {
      board[column][row] = player.symbol;
      console.log(board);
      controlFlow.nextRound();
    };
  };
  

  return {getBoard, upDateCell};
})();

const controlFlow = (function() {
  let roundNumber = 1;

  const getRoundNumber = () => roundNumber;
  const nextRound = () => {
    const winStatus = verifyWinner();
    if (winStatus == true) {
      console.log(player.currentPlayer());
    } else {
      return roundNumber += 1;
    }
  };
  
  return {getRoundNumber, nextRound};

})();

const player = (function() {

  let playerOne = { name: '', symbol: 'X',};
  let playerTwo = { name: '', symbol: 'O',};
 

  const currentPlayer = () => {
    let round = controlFlow.getRoundNumber();
    if (round % 2 == 0) {
      return playerTwo;
    } else {
      return playerOne;
    }
  };
  

  return {currentPlayer};
})();

function verifyWinner() {
  const board = gameboard.getBoard();
  if ((board[0][0] == board[0][1] && board[0][1] == board [0][2]) || 
    (board[1][0] == board[1][1] && board[1][1] == board [1][2]) ||
    (board[2][0] == board[2][1] && board[2][1] == board [2][2]) ||
    (board[0][0] == board[1][0] && board[1][0] == board [2][0]) ||
    (board[0][1] == board[1][1] && board[1][1] == board [2][1]) ||
    (board[0][2] == board[1][2] && board[1][2] == board [2][2]) ||
    (board[0][0] == board[0][1] && board[0][1] == board [0][2]) ||
    (board[0][0] == board[1][1] && board[1][1] == board [2][2]) ||
    (board[0][2] == board[1][1] && board[1][1] == board [2][0])) {
    return true;
  }
}