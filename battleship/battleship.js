//creates variables
var board = [];//the empty array holding the board
var HIT = 1;//the value given to the array when a ship is hit
var MISS = -1;//the value given to the array when a ship is missed
var torpedoesRemaining = 30;//how many torpedoesRemaining
var shipsSunk = 0;//how many ships have been hit
var gameOver = false;//starts with the value of false because the game isn't over
var shipsOnBoard=0;

// checkIfEmpty checks a horizontal group of squares to see if there is a ship on that location of the board
// row is the row we are checking
// column is the column where the left most square is
// length is length of spece being considered
// Returns true if none of the squares are occupied by a ship; false otherwise.
function checkIfEmptyHorizontal(row, column, length) {
  //loops through all the columns being checked
  for (i=-1; i<length+1; i++) {
    //checks the row where the ship will be and returns false if there is a ship there
    if (("" + board[row][column+i]).includes("ship")) {
      return false;
    }
    //checks the row below (only if there is one) and returns false if there is a ship there
    if (row < 9 && ("" + board[row+1][column+i]).includes("ship")) {
      return false;
    }
    //checks the row above (only if there is one) and returns false if there is a ship there
    if (row > 0 && ("" + board[row-1][column+i]).includes("ship")) {
      return false;
    }
  }
  //returns true if the whole ares is empty
  return true;
}

function checkIfEmptyVertical(row, column, length) {
  if (row === 0){//uses row generated at 0 specificall to check only the rows above it and not below it IE -1
    for (i=0; i<length+1; i++) {
      if (("" + board[row+i][column]).includes("ship")) {
        return false;
      }
      if (column < 9 && ("" + board[row+i][column+1]).includes("ship")) {
        return false;
      }
      if (column > 0 && ("" + board[row+i][column-1]).includes("ship")) {
        return false;
      }
    }
  }
  else if (row + length === 10){//uses row generated at 9 specifically to check only the rows below it and not above IE 10+
    for (i=-1; i<length; i++) {
      if (("" + board[row+i][column]).includes("ship")) {
        return false;
      }
      if (column < 9 && ("" + board[row+i][column+1]).includes("ship")) {
        return false;
      }
      if (column > 0 && ("" + board[row+i][column-1]).includes("ship")) {
        return false;
      }
    }
  }
  else {//SHOULD check rows 1-8 and check both below and above the rows for SHIPS. not going negative and not going above 9. IE -1 or 10.
    for (i=-1; i<length+1; i++) {
      if (("" + board[row+i][column]).includes("ship")) {
        return false;
      }
      if (column < 9 && ("" + board[row+i][column+1]).includes("ship")) {
        return false;
      }
      if (column > 0 && ("" + board[row+i][column-1]).includes("ship")) {
        return false;
      }
    }
  }
  return true;
}


//placeVerticalShips doesn't do anything because we don't know how to do this yet
//declaring random row
//declaring random column
//changing value of array at mathrandom to equal 0
//adding class to show red square

function placeVerticalShips(length, number) {
  var shipsPlaced = 0;
  do {
    var column = Math.floor(Math.random()*10);//declaring random row
    var row = Math.floor(Math.random()*(11-length));//declaring random column
    if (checkIfEmptyVertical(row, column, length) === true) {
      shipsOnBoard++;
      for (i=0; i<length; i++) {
        board[row+i][column] = "ship" + shipsOnBoard;
        $("#"+(row+i)+column).addClass("shipSquare");//FIXME fix add class
      }
      shipsPlaced++;
    }
  } while (shipsPlaced < number );
}

//changeValue
function changeValue(id, newValue) {
  var row = id.charAt(0);
  var column = id.charAt(1);
  board[row][column] = newValue;
}

function getValue(id) {
  var row = id.charAt(0);
  var column = id.charAt(1);
  return(board[row][column]);
}

//placeHorizontalShips generates a random location on the board to place one or more if there is room for it
//length is the length of the ship
//number is the amount of ships to place
//row generates a random row between 0-9
//column generates a random column between 0 and 10 minus the length of the ship
//it then calls checkIfEmpty to see if the squares are available to place the ship
//it uses a for loop to iterate through all of the squares in the row for the length of the ship
//if true it assigns the value of the array at the row/column previously generated to 0
//it then adds the class .shipSquare to the appropriate tds
//then it increments shipsPlaced by one
//it does this while shipsPlaced is less than the number of ships requested to place

function placeHorizontalShips(length, number) {
  var shipsPlaced = 0;
  do {
    var row = Math.floor(Math.random()*10);//declaring random row
    var column = Math.floor(Math.random()*(11-length));//declaring random column
    if (checkIfEmptyHorizontal(row, column, length) === true) {
      shipsOnBoard++;
      for (i=0; i<length; i++) {
        board[row][column + i] = "ship" + shipsOnBoard;//changing value of array at mathrandom to equal 0
        $("#"+row+(column+i)).addClass("shipSquare");//FIXME fix add class
      }
      shipsPlaced++;
    }
  } while (shipsPlaced < number );
}

for (var i=0; i < 10; i++) {//beginning of creating empty array function
  board[i] = [];//creates 10 empty arrays inside the arrays
}// end of empty array function

function checkIfSunk (number) {
  for (row=0; row<10; row++){
    for (column=0; column<10; column++) {
      if(("" + getValue("" + row + column)).includes("ship" + number)) {
        if(!(("" + getValue("" + row + column)).includes("hit"))) {
          return false;
        }
      }
    }
  }
  return true;
}

function checkThenSinkShip (number) {
  if (checkIfSunk(number)) {
    for (row=0; row<10; row++){
      for (column=0; column<10; column++) {
        if(("" + getValue("" + row + column)).includes("ship" + number)) {
          $("#" + row + column).addClass("sunkenShip");//FIXME fix add class
        }
      }
    }
    shipsSunk++;
  }
}

$(document).ready( function() {//beginning of ready function
  for (var i=0; i<10; i++) { //looping the variable 0-9 for first digit of ID
    var newTableRow = $("tbody").append("<tr></tr>");//making the rows
    for (var j=0; j<10; j++) { //looping the variable 0-9 for second digit of ID
      newTableRow.append('<td id="' + i + j + '">' + i + j + '</td>');//labeling the TD's
    }//end of J variable loop
  }//end of I variable loop

  //makes horizontal and vertical ships
  placeHorizontalShips(4, 1);
  placeVerticalShips(4, 1);
  placeHorizontalShips(3, 1);
  placeVerticalShips(3, 1);
  placeVerticalShips(2, 1);
  placeHorizontalShips(2, 1);

  $("td").on("click", function(){ //turns on click listener for all tds
    //executes if the game is not over (so the user can't click anything when the game is over)
    if (gameOver === false) {
      // executes when a user clicks a square, unless they have already clicked on it
      if (!(("" + getValue($(this).attr("id"))).includes("hit")||getValue($(this).attr("id")) === MISS)) {//FIXME fix add class
        //executes when a user HITS a ship
        if (("" + getValue($(this).attr("id"))).includes("ship")) {
          //concatenates "hit" onto the ships value into the board array. ex: the new value will be "ship4hit"
          changeValue($(this).attr("id"), (getValue($(this).attr("id"))+ "hit"));
          //adds the class "hit square" to clange the color of the square
          $(this).addClass("hitSquare");//FIXME fix add class
          //checks if the ship has been sunk. if it has, this changes the color of the ship and adds 1 to shipsSunk
          checkThenSinkShip(("" + getValue($(this).attr("id"))).charAt(4));
          //updates the heading to show the number of ships that have been sunk
          $("#shipsSunkHeading").text("Ships sunk: " + shipsSunk);
          //subtracts 1 from torpedoesRemaining
          torpedoesRemaining--;
          //updates the heading to show the number of torpedoes remaining
          $("#torpedoCountHeading").text("Torpedoes remaining: " + (torpedoesRemaining));
          //executes when a user sinks five ships and WINS
          if (shipsSunk === 5) {
            //updates the heading to say "You win"
            $("#torpedoCountHeading").text("You win!");
            //ends the game so the user can't click any more squares
            gameOver = true;
            // loops through all values in the board array
            for (row=0; row<10; row++){
              for (column=0; column<10; column++) {
                //finds all the ships that have not been hit
                if(("" + getValue("" + row + column)).includes("ship") && !(("" + getValue("" + row + column)).includes("hit"))) {
                  //reveals the ships by changing their color
                  $("#" + row + column).addClass("shipSquareRevealed");//FIXME fix add class
                }
              }
            }
          }
        }
        //executes when the user clicks a square and MISSES
        else {
          //changes the value of the position in the array
          changeValue($(this).attr("id"), MISS);
          //adds the class clicked square to change the color
          $(this).addClass("clickedSquare");
          //subtracts one from torpedoesRemaining
          torpedoesRemaining--;
          //updates the heading to show the number of torpedoes remaining
          $("#torpedoCountHeading").text("Torpedoes remaining: " + (torpedoesRemaining));
          // executes when the user runs out of torpedoes and LOSES
          if (torpedoesRemaining === 0) {
            //end the game so the user can't click anything
            gameOver = true;
            //updates the heading to say "You lose"
            $("#shipsSunkHeading").text("You lose!");
            // loops through all the values in the board
            for (row=0; row<10; row++){
              for (column=0; column<10; column++) {
                //finds all the ships
                if(("" + getValue("" + row + column)).includes("ship")) {
                  //reveals the ships
                  $("#" + row + column).addClass("shipSquareRevealed");//FIXME fix add class
                }
              }
            }
          }
        }
      }//end of checking if square has been clicked
    }
  }); // end of on click function
}); // end ready
