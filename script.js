//Basic Logic

const gameboard = (function() {

  const rows = 3;
  const columns = 3;
  let board = [];
  for (i = 0; i < columns; i++) {
    board[i] = [];
    for (let j = 0; j < rows; j++) {
      board[i].push(`cell ${i}.${j}`);  
    };
  };

  const getBoard = () => board;

  const upDateCell = (player, column, row) => {
    if (board[column][row] != 'X' && board[column][row] != 'O') {
      board[column][row] = player.symbol;
      console.log(board);
      controlFlow.nextRound();
    };
  };
  
  const resetBoard = () => {
    for (i = 0; i < columns; i++) {
      board[i] = [];
      for (let j = 0; j < rows; j++) {
        board[i].push(`cell ${i}.${j}`);  
      };
    };
  }

  return {getBoard, upDateCell, resetBoard};
})();

const controlFlow = (function() {
  let roundNumber = 1;

  const getRoundNumber = () => roundNumber;
  
  const nextRound = () => {
    const winStatus = verifyWinner();
    if (winStatus == true) {
      console.log(player.currentPlayer());
      displayWin();
    } else if (roundNumber == 9) {
      console.log('Tie');
      gameTie();
    } else {
      return roundNumber += 1;
    }
  };

  const newGame = () => {
    gameboard.resetBoard();
    player.setPlayerOneName('Giocatore 1');
    player.setPlayerTwoName('Giocatore 2');
    roundNumber = 1;
  };

  
  return {getRoundNumber, nextRound, newGame};

})();

const player = (function() {

  let playerOne = { name: 'Giocatore 1', symbol: 'X',};
  let playerTwo = { name: 'Giocatore 2', symbol: 'O',};

  const setPlayerOneName = (user_name) => playerOne.name = user_name;   
  const setPlayerTwoName = (user_name) => playerTwo.name = user_name;
  
  const currentPlayer = () => {
    let round = controlFlow.getRoundNumber();
    if (round % 2 == 0) {
      return playerTwo;
    } else {
      return playerOne;
    }
  };
  

  return {currentPlayer, setPlayerOneName, setPlayerTwoName, playerOne, playerTwo};
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
  };
};

//change name

const playerOneName = document.querySelector('#player1name');
const playerOneBtn = document.querySelector('#player1btn');

playerOneBtn.addEventListener('click', () => {
  let nameOne = prompt('Scegli il nome del Giocatore 1', 'Giocatore 1');
  player.setPlayerOneName(nameOne);
  playerOneName.textContent = nameOne;
});

const playerTwoName = document.querySelector('#player2name');
const playerTwoBtn = document.querySelector('#player2btn');

playerTwoBtn.addEventListener('click', () => {
  let nameTwo = prompt('Scegli il nome del Giocatore 2', 'Giocatore 2');
  player.setPlayerTwoName(nameTwo);
  playerTwoName.textContent = nameTwo;
});

//display game

function game() {
  const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
    cell.addEventListener('click', () => {
      let cellId = cell.getAttribute('id');
      let cellColumn = parseInt(cellId[4]);
      let cellRow = parseInt(cellId[6]);
      // console.log(cellColumn);
      // console.log(cellRow);
      putPlayerSymbol(cell);
      gameboard.upDateCell(player.currentPlayer(), cellColumn, cellRow);

  }, {once:true});
});
};

function putPlayerSymbol(cell) {
  if (player.currentPlayer() == player.playerOne) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns','http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '9em');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z');
    svg.appendChild(path);
    cell.appendChild(svg);
  } else if (player.currentPlayer() == player.playerTwo) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns','http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '9em');
    svg.setAttribute('fill', 'red');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z');
    svg.appendChild(path);
    cell.appendChild(svg);
  };
};

function displayWin() {
  
  const win = document.querySelector('.win');
  win.textContent = 'WIN!';
  win.setAttribute('style', 'font-size: 4em; text-align: center');
  const winner = document.querySelector('.winner');
  winner.textContent = player.currentPlayer().name;
  winner.setAttribute('style', 'font-size: 3em; text-align: center');
  
  //coloro la riga vincente
  const board = gameboard.getBoard();
  console.log(board);
  if (board[0][0] == board[0][1] && board[0][1] == board [0][2]){
    const cell1 = document.querySelector('#cell0-0');
    cell1.setAttribute('style', 'background-color: yellow');
    const cell2 = document.querySelector('#cell0-1');
    cell2.setAttribute('style', 'background-color: yellow');
    const cell3 = document.querySelector('#cell0-2');
    cell3.setAttribute('style', 'background-color: yellow');
  } else if (board[1][0] == board[1][1] && board[1][1] == board [1][2]){
    const cell1 = document.querySelector('#cell1-0');
    cell1.setAttribute('style', 'background-color: yellow');
    const cell2 = document.querySelector('#cell1-1');
    cell2.setAttribute('style', 'background-color: yellow');
    const cell3 = document.querySelector('#cell1-2');
    cell3.setAttribute('style', 'background-color: yellow');
  } else if (board[2][0] == board[2][1] && board[2][1] == board [2][2]){
    const cell1 = document.querySelector('#cell2-0');
    cell1.setAttribute('style', 'background-color: yellow');
    const cell2 = document.querySelector('#cell2-1');
    cell2.setAttribute('style', 'background-color: yellow');
    const cell3 = document.querySelector('#cell2-2');
    cell3.setAttribute('style', 'background-color: yellow');
  } else if (board[0][0] == board[1][0] && board[1][0] == board [2][0]){
    const cell1 = document.querySelector('#cell0-0');
    cell1.setAttribute('style', 'background-color: yellow');
    const cell2 = document.querySelector('#cell1-0');
    cell2.setAttribute('style', 'background-color: yellow');
    const cell3 = document.querySelector('#cell2-0');
    cell3.setAttribute('style', 'background-color: yellow');
  } else if (board[0][1] == board[1][1] && board[1][1] == board [2][1]) {
    const cell1 = document.querySelector('#cell0-1');
    cell1.setAttribute('style', 'background-color: yellow');
    const cell2 = document.querySelector('#cell1-1');
    cell2.setAttribute('style', 'background-color: yellow');
    const cell3 = document.querySelector('#cell2-1');
    cell3.setAttribute('style', 'background-color: yellow');
  } else if (board[0][2] == board[1][2] && board[1][2] == board [2][2]) {
    const cell1 = document.querySelector('#cell0-2');
    cell1.setAttribute('style', 'background-color: yellow');
    const cell2 = document.querySelector('#cell1-2');
    cell2.setAttribute('style', 'background-color: yellow');
    const cell3 = document.querySelector('#cell2-2');
    cell3.setAttribute('style', 'background-color: yellow');
  } else if (board[0][0] == board[0][1] && board[0][1] == board [0][2]) {
    const cell1 = document.querySelector('#cell0-0');
    cell1.setAttribute('style', 'background-color: yellow');
    const cell2 = document.querySelector('#cell0-1');
    cell2.setAttribute('style', 'background-color: yellow');
    const cell3 = document.querySelector('#cell0-2');
    cell3.setAttribute('style', 'background-color: yellow');
  } else if (board[0][0] == board[1][1] && board[1][1] == board [2][2]) {
    const cell1 = document.querySelector('#cell0-0');
    cell1.setAttribute('style', 'background-color: yellow');
    const cell2 = document.querySelector('#cell1-1');
    cell2.setAttribute('style', 'background-color: yellow');
    const cell3 = document.querySelector('#cell2-2');
    cell3.setAttribute('style', 'background-color: yellow');
  } else if (board[0][2] == board[1][1] && board[1][1] == board [2][0]) {
    const cell1 = document.querySelector('#cell0-2');
    cell1.setAttribute('style', 'background-color: yellow');
    const cell2 = document.querySelector('#cell1-1');
    cell2.setAttribute('style', 'background-color: yellow');
    const cell3 = document.querySelector('#cell2-0');
    cell3.setAttribute('style', 'background-color: yellow');
  };
};

function gameTie() {
  
  const win = document.querySelector('.win');
  win.textContent = 'Tie!';
  win.setAttribute('style', 'font-size: 4em; text-align: center');
  const winner = document.querySelector('.winner');
  winner.textContent = 'Tie!';
  winner.setAttribute('style', 'font-size: 4em; text-align: center');

}

//button to restart

const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', restart);

function restart() { 
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.setAttribute('style', 'background-color: antiquewhite');
    cell.replaceWith(cell.cloneNode(false));
  });
  const win = document.querySelector('.win');
  win.textContent = '';
  const winner = document.querySelector('.winner');
  winner.textContent = '';
  controlFlow.newGame(); // istanza per resetboard() azzera il round ed i nomi dei giocatori
  game();
};

game();
