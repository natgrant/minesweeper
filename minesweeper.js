document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!

var board = {
  cells: generateCells(6)
}
//   cells: [
//     {
//       row: 0, 
//       col: 0, 
//       isMine:'false', 
//       isMarked: 'false'
//       hidden:'true'
//       surroundingMines: 0
//     },


function generateCells (size) {

  //create a cells array
  let cells = [];

  // make a loop that auto generates cells for each row
  for(i = 0; i < size; i ++) {

    // make a nested for-loop to create individual objects/cells
    for(j = 0; j < size; j ++) {

      //create cell object row dictated by i, col dictated by j
      cell = {
        row: i,
        col: j,
        isMine: 'false',
        isMarked: 'false',
        hidden: 'true',
        surroundingMines: 0
      }
      // fill cells array with generated cells
      cells.push(cell);
      }
    }
    return cells
  }

  // isMine set to false - however game returning a bomb on every cell :o


function startGame () {
  // Don't remove this function call: it makes the game work!

  // for each cell on the board I need to loop through & count surrounding mines [i] 
  for (i = 0; i < board.cells.length; i ++) {
    // assign new count of surrounding mines to surrounding mines property
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
    // use event listener to call function checkForWin each time left mouse button is clicked 
    document.addEventListener("click", checkForWin); 
    // use event listener to call function checkForWin each time right mouse is clicked
    document.addEventListener("contextmenu", checkForWin); 
  
  // create board
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  board.cells.forEach(check => {
    if(check.isMine && !check.isMarked) return;
    else if(!check.isMine && check.hidden) return;

    lib.displayMessage('You win!')
  });
    
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.

function countSurroundingMines (cell) {
  // make a surrounding array variable using the lib function
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  //make a count variable that starts at zero;
  var count = 0;
  // loop through all of the surrounding cells
  for(j = 0; j <surrounding.length; j ++){
    // check if cell is a mine and if yes add to the count
    if(surrounding[j].isMine) {
      count ++;
    }
  }
  return count;
}