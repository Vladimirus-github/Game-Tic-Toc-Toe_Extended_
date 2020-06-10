let players = ["x", "o"];
let activePlayer = 0;

let board = [];

function startGame() {
  let num = checkPrompt();

  checkFullField(num);

  drawField(board, num);

  activePlayer = 0;

  renderBoard(board);
}

function click(row, col) {
  // Запись символа активного игрока в ячейку
  board[row][col] = players[activePlayer];

  checkWin(board, row, col);

  renderBoard(board);
  console.log(board);

  checkActivePlayer();
}

// Вспомогательные функции:

// Проверка входных данных на "мусорные" значения:
function checkPrompt() {
  let value;
  do {
    value = +prompt(
      "Введите размер поля (в кол-ве клеток), на котором хотите сразиться"
    );
  } while ((value <= 2 && value) || !value);
  return value;
}

// Проверка размера поля (массива board) перед отрисовкой, после предыдущей игры:
function checkFullField(value) {
  if (board.length > value) {
    board = [];
  }
}

// Создание игрового поля:
function drawField(arr, number) {
  for (let i = 0; i < number; i++) {
    arr[i] = [];
    for (let k = 0; k < number; k++) {
      arr[i][k] = "";
    }
  }
}

// Проверка активного игрока:
function checkActivePlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
}

// Проверка на выйгрыш одного из игроков:

function checkWin(arr, row, col) {
  let countStepRow = 0;
  let countStepCol = 0;
  let countStepDownDig = 0;
  let countStepUpDig = 0;

  for (let i = 0; i < board.length; i++) {
    // Проверка строк:
    if (board[row][i] === players[activePlayer]) {
      countStepRow += 1;
    }
    // Проверка столбцов:
    if (board[i][col] === players[activePlayer]) {
      countStepCol += 1;
    }
    // Проверка нисходящей диагонали:
    if (board[i][i] === players[activePlayer]) {
      countStepDownDig += 1;
    }

    //    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // Проверка восходящей диагонали:
    let k = board[i].length - 1 - i;
    if (board[k][i] === players[activePlayer]) {
      countStepUpDig += 1;
    }
  }

  if (
    countStepRow === board.length ||
    countStepCol === board.length ||
    countStepDownDig === board.length ||
    countStepUpDig === board.length
  ) {
    showWinner(activePlayer);
  }

  // console.log(`countStepRow: ${countStepRow}`);
  // console.log(`countStepCol: ${countStepCol}`);
  // console.log(`countStepDownDig: ${countStepDownDig}`);
  // console.log(`countStepUpDig: ${countStepUpDig}`);
  // console.log("_______________________");
}
