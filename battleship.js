var board = [];//the empty array holding the board
var SHIP = 0;//the value given to the array when a ship is placed
var HIT = 1;//the value given to the array when a ship is hit
var MISS = -1;//the value given to the array when a ship is missed
var torpedoesUsed = 0;//how many torpedoesUsed
var shipsHit = 0;//how many ships have been hit
var gameOver = false;//starts with the value of false because the game isn't over

// checkIfEmpty checks a horizontal group of squares to see if there is a ship on that location of the board
// row is the row we are checking
// column is the column where the left most square is
// length is length of spece being considered
// Returns true if none of the squares are occupied by a ship; false otherwise.
function checkIfEmpty(row, column, length) {
  for (i=-1; i<length+1; i++) {
    if (board[row][column+i] === SHIP) {
      return false;
    }
    if (row < 9 && board[row+1][column+i] === SHIP) {
      return false;
    }
    if (row > 0 && board[row-1][column+i] === SHIP) {
      return false;
    }
  }
  return true;
}

//placeVerticalShips doesn't do anything because we don't know how to do this yet
//declaring random row
//declaring random column
//changing value of array at mathrandom to equal 0
//adding class to show red square

function placeVerticalShips (length, number) {
  var shipsPlaced = 0;
  do {
    var row = Math.floor(Math.random()*10);
    var column = Math.floor(Math.random()*(11-length));
    if (checkIfEmpty(row, column, length) === true) {
      for (i=0; i<length; i++) {
        board[row][column + i] = SHIP;
        $("#"+row+(column+i)).addClass("shipSquare");
      }
      shipsPlaced++;
    }
  } while (shipsPlaced < number );
}

//placeAnyNumberShips generates a random location on the board to place one or more if there is room for it
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

function placeAnyNumberShips(length, number) {
  var shipsPlaced = 0;
  do {
    var row = Math.floor(Math.random()*10);//declaring random row
    var column = Math.floor(Math.random()*(11-length));//declaring random column
    if (checkIfEmpty(row, column, length) === true) {
      for (i=0; i<length; i++) {
        board[row][column + i] = SHIP;//changing value of array at mathrandom to equal 0
        $("#"+row+(column+i)).addClass("shipSquare");//adding class to show red square
      }
      shipsPlaced++;
    }
  } while (shipsPlaced < number );
}

for (var i=0; i < 10; i++) {//beginning of creating empty array function
  board[i] = [];//creates 10 empty arrays inside the arrays
}// end of empty array function

$(document).ready( function() {//beginning of ready function
  for (var i=0; i<10; i++) { //looping the variable 0-9 for first digit of ID
    var newTableRow = $("tbody").append("<tr></tr>");//making the rows
    for (var j=0; j<10; j++) { //looping the variable 0-9 for second digit of ID
      newTableRow.append('<td id="' + i + j + '">' + i + j + '</td>');//labeling the TD's
    }//end of J variable loop
  }//end of I variable loop

  placeAnyNumberShips(5, 2);
  placeAnyNumberShips(4, 2);
  placeAnyNumberShips(3, 2);
  placeAnyNumberShips(2, 2);
  placeAnyNumberShips(1, 2);


  // while (shipsPlaced < 9) { //beginning of while loop for shipsplaced
  //   var row = Math.floor(Math.random()*10);//declaring random row
  //   var column = Math.floor(Math.random()*10);//declaring random column
  //   if (board[row][column] != SHIP) {//beginning of if statement for ships not over lapping
  //     board[row][column] = SHIP;//changing value of array at mathrandom to equal 0
  //     // $("#"+row+column).text("ship");//adding text into the html to display ship
  //     $("#"+row+column).addClass("shipSquare");//adding class to show red square
  //     shipsPlaced++;//increment ships placed by one
  //   }//end of if statement for ships not over lapping
  // }//end of while loop for ships placed
  $("td").on("click", function(){ //turns on click listener for all tds
    if (gameOver === false) {
      if (!($(this).hasClass("clickedSquare")||($(this).hasClass("hitSquare")))) {//beginning of checking if square has been clicked
        if ($(this).hasClass("shipSquare")) {
          $(this).addClass("hitSquare");
          $(this).removeClass("shipSquare");
          shipsHit++;
          $("#shipsHitHeading").text("Ships hit: " + shipsHit);
          torpedoesUsed++;
          $("#torpedoCountHeading").text("Torpedoes remaining: " + (25 - torpedoesUsed));//incrementing the torpedo text in the jumbotron by 1
          if (shipsHit === 5) {
            $("#torpedoCountHeading").text("You win!");
            gameOver = true;
          }
        }
        else {
          $(this).addClass("clickedSquare"); //changes color of the square that was clicked
          torpedoesUsed ++; //adds one to torpedoesUsed
          $("#torpedoCountHeading").text("Torpedoes remaining: " + (25 - torpedoesUsed));//incrementing the torpedo text in the jumbotron by 1
          if (torpedoesUsed === 25) {
            gameOver = true;
            $("#shipsHitHeading").text("You lose!");
            $(".shipSquare").addClass("shipSquareRevealed");
          }
        }
      }//end of checking if square has been clicked
    }
  }); // end of on click function


}); // end ready
