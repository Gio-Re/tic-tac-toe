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
    }
  } 

  return {getBoard, upDateCell};
})();

const controlFlow = (function() {
  let roundNumber = 1;

  const getRoundNumber = () => roundNumber;
  const nextRound = () => roundNumber += 1;
  
  return {getRoundNumber, nextRound};

})();

const player = (function() {

  let playerOne = { name: '', symbol: 'X',};
  let playerTwo = { name: '', symbol: 'O',};
 

  const currentPlayer = (round) => {
    if (round % 2 == 0) {
      return playerTwo;
    } else {
      return playerOne;
    }
  };
  

  return {currentPlayer};
})();