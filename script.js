let rows = 30;
let cols = 50;
let board = Array.from({ length: rows }, () => Array(cols).fill(false));
let intervalId;
let generationCount = 0;
let speed = 200;  // Начальная скорость (мс)

const boardElement = document.getElementById('board');
const generationCountElement = document.getElementById('generationCount');

function createBoard() {
  boardElement.innerHTML = '';
  board.forEach((row, rowIndex) => {
    row.forEach((_, colIndex) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', () => toggleCell(rowIndex, colIndex));
      boardElement.appendChild(cell);
    });
  });
  boardElement.style.gridTemplateColumns = `repeat(${cols}, 20px)`;
}

function toggleCell(row, col) {
  board[row][col] = !board[row][col];
  renderBoard();
}

function renderBoard() {
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = boardElement.children[rowIndex * cols + colIndex];
      if (cell) {
        cellElement.classList.add('alive');
      } else {
        cellElement.classList.remove('alive');
      }
    });
  });
}

function startGame() {
  if (intervalId) return;
  intervalId = setInterval(nextGeneration, speed);
  document.querySelector('button[onclick="startGame()"]').disabled = true;
  document.querySelector('button[onclick="pauseGame()"]').disabled = false;
}

function pauseGame() {
  clearInterval(intervalId);
  intervalId = null;
  document.querySelector('button[onclick="startGame()"]').disabled = false;
  document.querySelector('button[onclick="pauseGame()"]').disabled = true;
}

function clearBoard() {
  pauseGame();
  board = Array.from({ length: rows }, () => Array(cols).fill(false));
  renderBoard();
  generationCount = 0;
  generationCountElement.textContent = generationCount;
}

function increaseSpeed() {
  if (speed > 50) {
    speed -= 50;
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = setInterval(nextGeneration, speed);
    }
  }
}

function decreaseSpeed() {
  speed += 50;
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = setInterval(nextGeneration, speed);
  }
}


function nextGeneration() {
  const newBoard = board.map((row, rowIndex) => 
    row.map((cell, colIndex) => {
      const liveNeighbors = countLiveNeighbors(rowIndex, colIndex);
      if (cell && (liveNeighbors === 2 || liveNeighbors === 3)) return true;
      if (!cell && liveNeighbors === 3) return true;
      return false;
    })
  );
  board = newBoard;
  renderBoard();
  generationCount++;
  generationCountElement.textContent = generationCount;
}

function countLiveNeighbors(row, col) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const newRow = row + i;
      const newCol = col + j;
      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
        count += board[newRow][newCol] ? 1 : 0;
      }
    }
  }
  return count;
}

createBoard();
renderBoard();
