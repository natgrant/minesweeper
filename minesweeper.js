document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!

var board = {
  cells: generateCells(5)
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
  var cells = [];
  // make a loop that auto generates cells for each row
  for(i = 0; i < size; i ++) {
    // make a nested for-loop to create individual objects/cells
    for(j = 0; j < size; j ++) {
      //create cell object row dictated by i, col dictated by j
      cell = {
        row: i,
        col: j,
        isMine: Math.floor(Math.random()*2), //set isMine to random cells on board not 'false' use math.random
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

  // isMine set to false - however game returning a bomb on every cell :o warum
  // isMine works when using Math.random but not when set to false


function startGame () {
  // Don't remove this function call: it makes the game work!
  // for each cell on the board I need to loop through & count surrounding mines [i] 
  for (i = 0; i < board.cells.length; i ++) {
    // assign new count of surrounding mines to surrounding mines property
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
    // use event listener to call function checkForWin each time left mouse button is clicked 
    document.addEventListener("click", checkForWin);
    // use event listener to mark cell as flagged
    document.addEventListener("contextmenu", checkForWin);
    document.addEventListener("click", losingSound);
  // create board
  lib.initBoard()
}

// Define this function to look for a win condition:
function checkForWin () {
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
 for(i = 0; i < board.cells.length; i ++) {
   const checkWinner = board.cells[i]
   if(checkWinner.isMine && checkWinner.isMarked) {
     return;
    }
    else if(!checkWinner.isMine && checkWinner.hidden){
      return;
    } 
 };
 winningSound();
 lib.displayMessage('You win!')

}

// ~WIP~ 
// create a reset board function after win or loss
// function resetBoard() {
// put classes back the way they were at the start
//   var elem = document.getElementsByClassName('board')[0];
//   while (elem.firstChild) {
//     elem.removeChild(elem.firstChild);
//   }
// re-initialize the global board object
// startGame();
// }

// var reset = document.querySelector(".reset");

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
// var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.

function countSurroundingMines (cell) {
  // make a surrounding array variable using the lib function
  let surrounding = lib.getSurroundingCells(cell.row, cell.col);
  //make a count variable that starts at zero;
  let count = 0;
  // loop through all of the surrounding cells
  for(j = 0; j <surrounding.length; j ++){
    // check if cell is a mine and if yes add to the count
    if(surrounding[j].isMine) {
      count ++;
    }
  }
  return count;
}

const winningSound = _ => {
  const winningBork = new Audio ('./sound/whistle.wav')
  winningBork.play();
}

const losingSound = _ => {
  const losingBork = new Audio ('./sound/labrador-barking.wav')
  // if isMine && not hidden
  // play losing sound with no loop
  losingBork.loop = false;

  board.cells.forEach((box) => {
    if(box.isMine && !box.hidden) {
      losingBork.play()
    }
  })
}

